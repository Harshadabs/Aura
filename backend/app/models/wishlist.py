from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Wishlist(Base):
    __tablename__ = "wishlist"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="wishlist")
