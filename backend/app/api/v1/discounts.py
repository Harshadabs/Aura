from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.discount import Discount
from app.schemas.discount import DiscountCreate, DiscountResponse

router = APIRouter(prefix="/discounts", tags=["Discounts"])

@router.post("/", response_model=DiscountResponse)
def create_discount(discount: DiscountCreate, db: Session = Depends(get_db)):
    existing = db.query(Discount).filter(Discount.code == discount.code).first()
    if existing:
        raise HTTPException(status_code=400, detail="Discount code already exists")
    new_discount = Discount(**discount.dict())
    db.add(new_discount)
    db.commit()
    db.refresh(new_discount)
    return new_discount

@router.get("/{code}", response_model=DiscountResponse)
def get_discount(code: str, db: Session = Depends(get_db)):
    discount = db.query(Discount).filter(Discount.code == code, Discount.active == True).first()
    if not discount:
        raise HTTPException(status_code=404, detail="Discount not found or inactive")
    return discount
