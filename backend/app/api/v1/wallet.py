from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.wallet import Wallet

router = APIRouter(prefix="/wallet", tags=["Wallet"])

@router.get("/{user_id}")
def get_wallet(user_id: int, db: Session = Depends(get_db)):
    wallet = db.query(Wallet).filter(Wallet.user_id == user_id).first()
    if not wallet:
        wallet = Wallet(user_id=user_id)
        db.add(wallet)
        db.commit()
        db.refresh(wallet)
    return wallet

@router.post("/add/{user_id}")
def add_balance(user_id: int, amount: float, db: Session = Depends(get_db)):
    wallet = db.query(Wallet).filter(Wallet.user_id == user_id).first()
    if not wallet:
        wallet = Wallet(user_id=user_id, balance=0.0)
    wallet.balance += amount
    db.add(wallet)
    db.commit()
    db.refresh(wallet)
    return {"message": "Balance added", "balance": wallet.balance}

@router.post("/deduct/{user_id}")
def deduct_balance(user_id: int, amount: float, db: Session = Depends(get_db)):
    wallet = db.query(Wallet).filter(Wallet.user_id == user_id).first()
    if not wallet or wallet.balance < amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    wallet.balance -= amount
    db.commit()
    db.refresh(wallet)
    return {"message": "Balance deducted", "balance": wallet.balance}
