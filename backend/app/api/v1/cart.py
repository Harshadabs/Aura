from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.cart import Cart
<<<<<<< HEAD
from fastapi import APIRouter
=======
from app.models.item import Item
from app.schemas.cart import CartCreate, CartResponse
>>>>>>> parent of 0c0b719e (trouble shooting wishlist, orders and cart)

router = APIRouter(prefix="/cart", tags=["Cart"])

<<<<<<< HEAD
@router.post("/")
def add_to_cart(data: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    cart = Cart(user_id=user.id, product_id=data["product_id"])
    db.add(cart)
=======
# 🛒 Add to Cart
@router.post("/", response_model=CartResponse)
def add_to_cart(cart_data: CartCreate, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == cart_data.item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    total_price = item.price * cart_data.quantity

    cart_item = Cart(
        user_id=cart_data.user_id,
        item_id=cart_data.item_id,
        quantity=cart_data.quantity,
        total_price=total_price
    )
    db.add(cart_item)
>>>>>>> parent of 0c0b719e (trouble shooting wishlist, orders and cart)
    db.commit()
    return {"message": "added"}

<<<<<<< HEAD
@router.get("/")
def view_cart(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Cart).filter(Cart.user_id == user.id).all()
=======

# 🧾 View Cart (per user)
@router.get("/{user_id}", response_model=list[CartResponse])
def view_cart(user_id: int, db: Session = Depends(get_db)):
    cart = db.query(Cart).filter(Cart.user_id == user_id).all()
    return cart


# ✏️ Update Quantity
@router.put("/{cart_id}", response_model=CartResponse)
def update_cart(cart_id: int, cart_data: CartCreate, db: Session = Depends(get_db)):
    cart_item = db.query(Cart).filter(Cart.id == cart_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    item = db.query(Item).filter(Item.id == cart_data.item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    cart_item.quantity = cart_data.quantity
    cart_item.total_price = item.price * cart_data.quantity
    db.commit()
    db.refresh(cart_item)
    return cart_item


# ❌ Remove item from cart
@router.delete("/{cart_id}")
def remove_from_cart(cart_id: int, db: Session = Depends(get_db)):
    cart_item = db.query(Cart).filter(Cart.id == cart_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(cart_item)
    db.commit()
    return {"message": f"Cart item {cart_id} removed successfully"}


# 🧹 Clear entire cart
@router.delete("/clear/{user_id}")
def clear_cart(user_id: int, db: Session = Depends(get_db)):
    db.query(Cart).filter(Cart.user_id == user_id).delete()
    db.commit()
    return {"message": "Cart cleared successfully"}
>>>>>>> parent of 0c0b719e (trouble shooting wishlist, orders and cart)
