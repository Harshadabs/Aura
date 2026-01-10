from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token
from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/signup")
def signup(data: dict, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data["email"]).first():
        raise HTTPException(400, "Email exists")
    user = User(
        email=data["email"],
        hashed_password=hash_password(data["password"])
    )
    db.add(user)
    db.commit()
    return {"message": "ok"}

@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data["email"]).first()
    if not user or not verify_password(data["password"], user.hashed_password):
        raise HTTPException(401, "Invalid credentials")
    token = create_access_token({"sub": user.email})
    return {"access_token": token}
