from sqlalchemy import Column, Integer, ForeignKey
from app.core.database import Base

class Cart(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    item_id = Column(Integer, ForeignKey("items.id", ondelete="CASCADE"))
    quantity = Column(Integer, default=1)
