from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.models.wishlist import Wishlist
from app.schemas.wishlist import WishlistCreate
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.product import Product
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Wishlist, Product
from auth import get_current_user

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])


# ✅ GET WISHLIST
@router.get("/")
def get_wishlist(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    wishlist = (
        db.query(Wishlist)
        .join(Product)
        .filter(Wishlist.user_id == user.id)
        .all()
    )

    return [
        {
            "id": item.id,
            "product_id": item.product_id,
            "name": item.product.name,
            "price": item.product.price,
            "image_url": item.product.image_url,
        }
        for item in wishlist
    ]


# ✅ ADD TO WISHLIST
@router.post("/")
def add_to_wishlist(
    product_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    exists = (
        db.query(Wishlist)
        .filter_by(user_id=user.id, product_id=product_id)
        .first()
    )

    if exists:
        raise HTTPException(status_code=400, detail="Already in wishlist")

    wishlist = Wishlist(user_id=user.id, product_id=product_id)
    db.add(wishlist)
    db.commit()

    return {"message": "Added to wishlist"}


# ✅ REMOVE FROM WISHLIST
@router.delete("/{wishlist_id}")
def remove_from_wishlist(
    wishlist_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    item = (
        db.query(Wishlist)
        .filter_by(id=wishlist_id, user_id=user.id)
        .first()
    )

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(item)
    db.commit()

    return {"message": "Removed from wishlist"}

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])


@router.get("/")
def get_wishlist(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    items = (
        db.query(
            Wishlist.id,
            Wishlist.product_id,
            Product.name,
            Product.price,
            Product.image_url
        )
        .join(Product, Product.id == Wishlist.product_id)
        .filter(Wishlist.user_id == current_user.id)
        .all()
    )

    return [
        {
            "id": item.id,
            "product_id": item.product_id,
            "name": item.name,
            "price": item.price,
            "image_url": item.image_url,
        }
        for item in items
    ]


@router.post("/")
def add_to_wishlist(
    data: WishlistCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    wishlist_item = Wishlist(
        user_id=current_user.id,
        product_id=data.product_id
    )
    db.add(wishlist_item)
    db.commit()
    db.refresh(wishlist_item)
    return wishlist_item

@router.post("/move-to-cart/{product_id}")
def move_to_cart(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    from app.models.cart import Cart

    exists = db.query(Cart).filter(
        Cart.user_id == current_user.id,
        Cart.product_id == product_id
    ).first()

    if not exists:
        db.add(Cart(user_id=current_user.id, product_id=product_id))

    db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id,
        Wishlist.product_id == product_id
    ).delete()

    db.commit()
    return {"message": "Moved to cart"}
