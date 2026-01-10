from pydantic import BaseModel

class CartAdd(BaseModel):
    product_id: int

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

    class Config:
        from_attributes = True  # IMPORTANT for SQLAlchemy
