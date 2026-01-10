<<<<<<< HEAD
from sqlalchemy import Column, Integer, ForeignKey
=======
from sqlalchemy import Column, Integer, Float, String, ForeignKey
>>>>>>> parent of 0c0b719e (trouble shooting wishlist, orders and cart)
from app.core.database import Base

class Order(Base):
    __tablename__ = "orders"

<<<<<<< HEAD
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    total = Column(Integer)
=======
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    status = Column(String, default="pending")
>>>>>>> parent of 0c0b719e (trouble shooting wishlist, orders and cart)
