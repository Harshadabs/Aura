from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.cart import Cart
from app.models.order import Order
from app.models.product import Product

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/checkout")
def checkout(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    cart_items = db.query(Cart).filter(Cart.user_id == current_user.id).all()

    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()

        order = Order(
            user_id=current_user.id,
            product_name=product.name,
            price=product.price,
            quantity=item.quantity
        )
        db.add(order)

    db.query(Cart).filter(Cart.user_id == current_user.id).delete()
    db.commit()

    return {"message": "Order placed successfully"}
