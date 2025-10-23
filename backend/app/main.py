from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine, get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Aura Ecommerce")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Aura Backend Running Successfully 🚀"}

@app.post("/users/signup", response_model=UserResponse)
def signup_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        contact_no=user.contact_no,
        email=user.email,
        password=user.password,  # (TODO: hash this in production)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/users/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    if existing_user.password != user.password:
        raise HTTPException(status_code=401, detail="Incorrect password")
    return {"message": "Login successful", "user": existing_user.email}
