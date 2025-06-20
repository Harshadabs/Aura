from django.urls import path
from .views import ProductView, AddToCartView, CreateOrderView, OrdersListView


urlpatterns = [
    path('products/', ProductView.as_view()),
    path('add/', AddToCartView.as_view()),
    path('create/', CreateOrderView.as_view()),
    path('view/', OrdersListView.as_view(), name='order-list'),
]
