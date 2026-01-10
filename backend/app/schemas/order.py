from pydantic import BaseModel
from typing import List

class OrderItemRead(BaseModel):
    product_id: int
    quantity: int
    price: float

    class Config:
        from_attributes = True


class OrderRead(BaseModel):
    id: int
    total_amount: float
    status: str
    items: List[OrderItemRead]

    class Config:
        from_attributes = True
