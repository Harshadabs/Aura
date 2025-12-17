from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.order import Order
from app.core.database import get_db
from app.core.auth import get_current_user
from fastapi import HTTPException
from app.api.v1.cart import Cart

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.get("/")
def get_orders(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return db.query(Order).filter(Order.user_id == current_user.id).all()

@router.post("/")
def create_order(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    cart_items = db.query(Cart).filter(Cart.user_id == current_user.id).all()

    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    for item in cart_items:
        order = Order(
            user_id=current_user.id,
            item_name=item.product.name,
            status="Placed"
        )
        db.add(order)

    # clear cart after checkout
    db.query(Cart).filter(Cart.user_id == current_user.id).delete()

    db.commit()
    return {"message": "Order placed successfully"}
