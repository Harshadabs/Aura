from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.cart import Cart
from app.schemas.cart import CartCreate, CartResponse

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.post("/", response_model=CartResponse)
def add_to_cart(cart: CartCreate, db: Session = Depends(get_db)):
    db_cart = Cart(**cart.dict())
    db.add(db_cart)
    db.commit()
    db.refresh(db_cart)
    return db_cart

@router.get("/{user_id}", response_model=list[CartResponse])
def get_cart(user_id: int, db: Session = Depends(get_db)):
    items = db.query(Cart).filter(Cart.user_id == user_id).all()
    if not items:
        raise HTTPException(status_code=404, detail="Cart is empty")
    return items
