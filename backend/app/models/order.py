from sqlalchemy import Column, Integer, ForeignKey
from app.core.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    total = Column(Integer)
