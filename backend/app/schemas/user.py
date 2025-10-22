from pydantic import BaseModel, EmailStr

# Input (registration)
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

# Output (response)
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool

    class Config:
        orm_mode = True

# Token schema
class Token(BaseModel):
    access_token: str
    token_type: str
