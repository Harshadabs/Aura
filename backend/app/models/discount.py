from sqlalchemy import Column, Integer, String, Float, Boolean
from app.core.database import Base

class Discount(Base):
    __tablename__ = "discounts"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True)
    percentage = Column(Float)
    active = Column(Boolean, default=True)
