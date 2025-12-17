from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.models.wishlist import Wishlist
from app.core.database import get_db
from app.core.auth import get_current_user
from app.schemas.wishlist import WishlistCreate, WishlistResponse

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])


# ❤️ Get Wishlist
@router.get("/")
def get_wishlist(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    wishlist_items = (
        db.query(Wishlist)
        .filter(Wishlist.user_id == current_user.id)
        .all()
    )

    return [
        {
            "id": item.id,
            "product": {
                "id": item.product.id,
                "name": item.product.name,
                "price": item.product.price,
                "image_url": item.product.image_url,
                "description": item.product.description,
            }
        }
        for item in wishlist_items
    ]



# ➕ Add to Wishlist
@router.post("/", response_model=WishlistResponse)
def add_to_wishlist(
    data: WishlistCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    wishlist = Wishlist(
        user_id=current_user.id,
        product_id=data.product_id
    )
    db.add(wishlist)
    db.commit()
    db.refresh(wishlist)
    return wishlist
