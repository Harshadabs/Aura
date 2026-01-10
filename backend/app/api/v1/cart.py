from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.cart import Cart
from fastapi import APIRouter

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.post("/")
def add_to_cart(data: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    cart = Cart(user_id=user.id, product_id=data["product_id"])
    db.add(cart)
    db.commit()
    return {"message": "added"}

@router.get("/")
def view_cart(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Cart).filter(Cart.user_id == user.id).all()
