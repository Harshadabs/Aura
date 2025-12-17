from sqlalchemy import Column, Integer, String, Float, Text
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    image_url = Column(String(255))
    category = Column(String(100))
    stock = Column(Integer, default=0)
    sizes = Column(String(100))