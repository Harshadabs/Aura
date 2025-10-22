from pydantic import BaseModel
from datetime import datetime

class DiscountBase(BaseModel):
    code: str
    percentage: float
    expires_at: datetime

class DiscountCreate(DiscountBase):
    pass

class DiscountResponse(DiscountBase):
    id: int

    class Config:
        from_attributes = True
