from pydantic import BaseModel

<<<<<<< HEAD
class CartAdd(BaseModel):
    product_id: int

# -------- CREATE CART --------
class CartCreate(BaseModel):
    product_id: int
    quantity: int


# -------- RESPONSE SCHEMA --------
class CartResponse(BaseModel):
    id: int
=======
class CartBase(BaseModel):
>>>>>>> parent of 0c0b719e (trouble shooting wishlist, orders and cart)
    user_id: int
    item_id: int
    quantity: int
<<<<<<< HEAD
=======

class CartCreate(CartBase):
    pass

class CartResponse(CartBase):
    id: int
>>>>>>> parent of 0c0b719e (trouble shooting wishlist, orders and cart)

    class Config:
        from_attributes = True
