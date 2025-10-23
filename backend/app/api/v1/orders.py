from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.order import Order
from app.core.database import get_db

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/")
def create_order(user_id: int, amount: float, db: Session = Depends(get_db)):
    order = Order(user_id=user_id, amount=amount)
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

@router.get("/{user_id}")
def get_user_orders(user_id: int, db: Session = Depends(get_db)):
    return db.query(Order).filter(Order.user_id == user_id).all()
