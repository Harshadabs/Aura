from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from jose import jwt
from app.core.database import Base, engine, get_db
from app import models
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserResponse

# ---------- CONFIG ----------
SECRET_KEY = "23456543q3we4565er67"  # change this to something secure
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# ---------- INIT ----------
Base.metadata.create_all(bind=engine)
app = FastAPI(title="Aura Ecommerce")

# ---------- MIDDLEWARE ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- TOKEN CREATION ----------
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

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
        password=user.password,  # ⚠️ In production: hash this before saving
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
@app.post("/users/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    if existing_user.password != user.password:
        raise HTTPException(status_code=401, detail="Incorrect password")

    # ✅ Create JWT token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": existing_user.email},
        expires_delta=access_token_expires
    )

    # ✅ Return token and user info
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

# ------------------ AUTH SETUP ------------------
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Decode JWT token and return the logged-in user."""
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# ------------------ PROTECTED ROUTE ------------------
@app.get("/users/me", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user


