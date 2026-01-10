from sqlalchemy import Column, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.core.database import Base

class Cart(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    item_id = Column(Integer, ForeignKey("items.id"))
    quantity = Column(Integer, default=1)
<<<<<<< HEAD
=======
    total_price = Column(Float)
>>>>>>> parent of 0c0b719e (trouble shooting wishlist, orders and cart)

    user = relationship("User", back_populates="cart_items")
    item = relationship("Item", back_populates="cart_entries")
    