from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.models.order import Order
from app.models.item import Item

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/users")
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/orders")
def list_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()

@router.get("/stock")
def stock_report(db: Session = Depends(get_db)):
    return db.query(Item).all()
