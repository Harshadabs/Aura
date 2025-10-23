from fastapi import APIRouter, HTTPException
import uuid

router = APIRouter(prefix="/payment", tags=["Payment"])

@router.post("/create-session")
def create_payment_session(amount: float):
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid payment amount")
    session_id = str(uuid.uuid4())
    return {"session_id": session_id, "amount": amount, "status": "created"}

@router.post("/confirm")
def confirm_payment(session_id: str):
    return {"session_id": session_id, "status": "payment_success"}
