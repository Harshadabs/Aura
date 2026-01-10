from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.order import Order, OrderItem
from app.models.cart import Cart
from app.models.user import User
from app.schemas.order import OrderRead
from app.core.auth import get_current_user
from app.models.product import Product

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/checkout", response_model=OrderRead)
def checkout(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    cart_items = db.query(Cart).filter(Cart.user_id == user.id).all()

    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total = 0

    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        total += product.price * item.quantity

    order = Order(
        user_id=user.id,
        total_amount=total,
        status="PLACED"
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        db.add(OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=item.quantity,
            price=product.price
        ))

    db.query(Cart).filter(Cart.user_id == user.id).delete()
    db.commit()

    return order

@router.get("/", response_model=List[OrderRead])
def my_orders(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return db.query(Order).filter(Order.user_id == user.id).order_by(Order.id.desc()).all()
