from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, CartItem, Order
from .serializers import ProductSerializer, CartItemSerializer, OrderSerializer

class ProductView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddToCartView(APIView):
    def post(self, request):
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateOrderView(APIView):
    def post(self, request):
        cart_ids = request.data.get('cart_ids', [])
        cart_items = CartItem.objects.filter(id__in=cart_ids)
        order = Order.objects.create()
        order.cart_items.set(cart_items)
        order.calculate_total()
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

