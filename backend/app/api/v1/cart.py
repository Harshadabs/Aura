from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.cart import Cart
from app.models.product import Product
from app.schemas.cart import CartCreate, CartResponse

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)

# 🛒 ADD TO CART
@router.post("/", response_model=CartResponse)
def add_to_cart(
    cart_data: CartCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == cart_data.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    total_price = product.price * cart_data.quantity

    cart_item = Cart(
        user_id=current_user.id,
        product_id=cart_data.product_id,
        quantity=cart_data.quantity,
        total_price=total_price
    )

    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return cart_item


# 🧾 VIEW MY CART
@router.get("/", response_model=List[CartResponse])
def view_cart(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return db.query(Cart).filter(Cart.user_id == current_user.id).all()


# ✏️ UPDATE QUANTITY
@router.put("/{cart_id}", response_model=CartResponse)
def update_cart(
    cart_id: int,
    cart_data: CartCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    cart_item = db.query(Cart).filter(
        Cart.id == cart_id,
        Cart.user_id == current_user.id
    ).first()

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    cart_item.quantity = cart_data.quantity
    cart_item.total_price = product.price * cart_data.quantity

    db.commit()
    db.refresh(cart_item)
    return cart_item


# ❌ REMOVE ITEM
@router.delete("/{cart_id}")
def remove_from_cart(
    cart_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    cart_item = db.query(Cart).filter(
        Cart.id == cart_id,
        Cart.user_id == current_user.id
    ).first()

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(cart_item)
    db.commit()
    return {"message": "Item removed from cart"}


# 🧹 CLEAR CART
@router.delete("/clear")
def clear_cart(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    db.query(Cart).filter(Cart.user_id == current_user.id).delete()
    db.commit()
    return {"message": "Cart cleared successfully"}
