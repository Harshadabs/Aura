from rest_framework import serializers
from .models import Product, CartItem, Order

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'cart_items', 'total_amount', 'created_at']
