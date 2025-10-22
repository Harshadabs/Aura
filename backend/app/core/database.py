# backend/app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# SQLAlchemy Database URL (from config)
DATABASE_URL = settings.DATABASE_URL

# Engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Session Local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base Class for Models
Base = declarative_base()

# Dependency for DB session (used in routes)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
