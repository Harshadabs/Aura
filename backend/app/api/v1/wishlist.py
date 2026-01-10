from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.wishlist import Wishlist
from fastapi import APIRouter

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])

@router.post("/")
def add(data: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    w = Wishlist(user_id=user.id, product_id=data["product_id"])
    db.add(w)
    db.commit()
    return {"message": "ok"}

@router.get("/")
def list(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Wishlist).filter(Wishlist.user_id == user.id).all()