from fastapi import FastAPI
from app.core.database import Base, engine
from app.api.v1.cart import Cart
from app.api.v1.wishlist import Wishlist
from fastapi import FastAPI
from app.api.v1.cart import router as cart_router
from app.api.v1.wishlist import router as wishlist_router
from app.api.v1.users import router as users_router

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app = FastAPI()

app.include_router(users_router)
app.include_router(cart_router)
app.include_router(wishlist_router)

Base.metadata.create_all(bind=engine)



