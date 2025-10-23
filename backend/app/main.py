from fastapi import FastAPI
from app.api.v1 import users, items, cart, discounts, payment, wallet, admin

app = FastAPI(title="Aura Ecommerce")

app.include_router(users.router)
app.include_router(items.router)
app.include_router(cart.router)
app.include_router(discounts.router)
app.include_router(payment.router)
app.include_router(wallet.router)
app.include_router(admin.router)

