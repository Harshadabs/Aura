from pydantic import BaseModel

# -------- CREATE CART --------
class CartCreate(BaseModel):
    product_id: int
    quantity: int


# -------- RESPONSE SCHEMA --------
class CartResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int
    total_price: int

    class Config:
        from_attributes = True  # IMPORTANT for SQLAlchemy
