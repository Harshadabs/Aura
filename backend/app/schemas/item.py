from pydantic import BaseModel

class ItemBase(BaseModel):
    name: str
    description: str | None = None
    price: float
    quantity: int

class ItemCreate(ItemBase):
    pass

class ItemResponse(ItemBase):
    id: int

    class Config:
        from_attributes = True  # replaces orm_mode=True for Pydantic v2
