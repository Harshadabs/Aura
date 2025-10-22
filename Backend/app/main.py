from fastapi import FastAPI
from .core.database import Base, engine

app = FastAPI(title="Aura Backend")

# Import models so SQLAlchemy can detect them
from models import *

# Create tables on startup
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Aura Backend is live!"}
