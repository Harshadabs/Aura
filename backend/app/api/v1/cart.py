from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.cart import Cart
from app.models.product import Product
from app.schemas.cart import CartAdd

router = APIRouter(prefix="/cart", tags=["Cart"])

# ➕ Add / Increase quantity
@router.post("/")
def add_to_cart(
    data: CartAdd,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    cart = db.query(Cart).filter(
        Cart.user_id == current_user.id,
        Cart.product_id == data.product_id
    ).first()

    if cart:
        cart.quantity += 1
    else:
        cart = Cart(
            user_id=current_user.id,
            product_id=data.product_id,
            quantity=1
        )
        db.add(cart)

    db.commit()
    return {"message": "Added to cart"}

# ➖ Decrease quantity
@router.put("/decrease/{cart_id}")
def decrease_quantity(
    cart_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    cart = db.query(Cart).filter(
        Cart.id == cart_id,
        Cart.user_id == current_user.id
    ).first()

    if not cart:
        raise HTTPException(status_code=404, detail="Item not found")

    if cart.quantity > 1:
        cart.quantity -= 1
    else:
        db.delete(cart)

    db.commit()
    return {"message": "Updated"}

# 📦 View cart
@router.get("/")
def view_cart(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    items = (
        db.query(
            Cart.id.label("cart_id"),
            Cart.quantity,
            Product.id.label("product_id"),
            Product.name,
            Product.price,
            Product.image_url
        )
        .join(Product, Product.id == Cart.product_id)
        .filter(Cart.user_id == current_user.id)
        .all()
    )

    return [
        {
            "cart_id": item.cart_id,
            "product_id": item.product_id,
            "name": item.name,
            "price": item.price,
            "quantity": item.quantity,
            "image_url": item.image_url,
        }
        for item in items
    ]

# ❌ Remove item
@router.delete("/{cart_id}")
def remove_item(
    cart_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    cart = db.query(Cart).filter(
        Cart.id == cart_id,
        Cart.user_id == current_user.id
    ).first()

    if not cart:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(cart)
    db.commit()
    return {"message": "Removed"}
