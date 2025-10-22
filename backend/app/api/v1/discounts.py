from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from app.core.database import get_db
from app.models.discount import Discount
from app.schemas.discount import DiscountCreate, DiscountResponse

router = APIRouter(prefix="/discounts", tags=["Discounts"])

@router.post("/", response_model=DiscountResponse)
def create_discount(discount: DiscountCreate, db: Session = Depends(get_db)):
    db_discount = Discount(**discount.dict())
    db.add(db_discount)
    db.commit()
    db.refresh(db_discount)
    return db_discount

@router.get("/{code}", response_model=DiscountResponse)
def get_discount(code: str, db: Session = Depends(get_db)):
    discount = db.query(Discount).filter(Discount.code == code).first()
    if not discount:
        raise HTTPException(status_code=404, detail="Invalid discount code")
    if discount.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Discount expired")
    return discount
