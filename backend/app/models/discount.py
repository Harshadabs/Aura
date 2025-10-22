from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime, timedelta
from app.core.database import Base

class Discount(Base):
    __tablename__ = "discounts"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, nullable=False)
    percentage = Column(Float, nullable=False)
    expires_at = Column(DateTime, default=lambda: datetime.utcnow() + timedelta(days=30))
