from pydantic import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Aura Backend"
    DATABASE_URL: str = "sqlite:///./aura.db"  # Change later for Postgres

    class Config:
        env_file = ".env"

settings = Settings()
