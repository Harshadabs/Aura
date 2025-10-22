from pydantic import BaseModel

class CartBase(BaseModel):
    user_id: int
    item_id: int
    quantity: int

class CartCreate(CartBase):
    pass

class CartResponse(CartBase):
    id: int

    class Config:
        from_attributes = True
