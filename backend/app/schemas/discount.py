from pydantic import BaseModel

class DiscountBase(BaseModel):
    code: str
    percentage: float

class DiscountCreate(DiscountBase):
    pass

class DiscountResponse(DiscountBase):
    id: int
    active: bool

    class Config:
        from_attributes = True
