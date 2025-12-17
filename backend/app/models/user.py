from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    contact_no = Column(String)
    password = Column(String)

    profile = relationship("Profile", back_populates="user", uselist=False)
    orders = relationship("Order", back_populates="user", cascade="all, delete")
    wishlist = relationship("Wishlist", back_populates="user", cascade="all, delete")
    cart = relationship("Cart", back_populates="user", cascade="all, delete")


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    contact_no = Column(String, nullable=False)
    address = Column(Text, nullable=True)

    user = relationship("User", back_populates="profile")


