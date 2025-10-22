from fastapi import FastAPI
from app.core.database import Base, engine
from app.api.v1 import users, items, cart, discounts

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Aura Ecommerce")

app.include_router(users.router)
app.include_router(items.router)
app.include_router(cart.router)
app.include_router(discounts.router)

@app.get("/")
def root():
    return {"message": "Aura backend fully loaded: Users + Items + Cart + Discounts!"}
