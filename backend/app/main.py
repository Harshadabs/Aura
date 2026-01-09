from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import jwt, JWTError

# ✅ DATABASE (ONE SOURCE ONLY)
from app.core.database import Base, engine, get_db

# ✅ IMPORT ALL MODELS (VERY IMPORTANT)
import app.models  # loads User, Order, Wishlist

# ✅ SCHEMAS & MODELS
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserResponse

# ---------- CONFIG ----------
SECRET_KEY = "23456543q3we4565er67"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# ---------- INIT ----------
app = FastAPI(title="Aura Ecommerce")

# ✅ CREATE TABLES (ONLY ONCE, AFTER MODELS IMPORT)
Base.metadata.create_all(bind=engine)

# ---------- MIDDLEWARE ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- TOKEN CREATION ----------
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ---------- ROUTES ----------
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
        password=user.password,  # ⚠️ hash later
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

    access_token = create_access_token(
        data={"sub": existing_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": existing_user.email,
            "first_name": existing_user.first_name,
            "last_name": existing_user.last_name,
            "contact_no": existing_user.contact_no,
        }
    }

# ------------------ AUTH ------------------
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@app.get("/users/me", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

# ---------- STATIC ----------
from fastapi.staticfiles import StaticFiles
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# ---------- ROUTERS ----------
from app.api.v1 import orders
app.include_router(orders.router)

from app.api.v1 import wishlist
app.include_router(wishlist.router)

from app.api.v1 import products
app.include_router(products.router)

from app.api.v1 import cart
app.include_router(cart.router)

