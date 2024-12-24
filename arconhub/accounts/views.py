from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
import json

# Use csrf_exempt to properly handle CSRF for APIs
@method_decorator(csrf_exempt, name='dispatch')
class SignUpView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            email = data.get("email")

            if not username or not password or not email:
                return JsonResponse({"error": "All fields are required."}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already exists."}, status=400)

            User.objects.create_user(username=username, password=password, email=email)
            return JsonResponse({"message": "User registered successfully"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            if not username or not password:
                return JsonResponse({"error": "Username and password are required."}, status=400)

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Login successful!"}, status=200)
            else:
                return JsonResponse({"error": "Invalid credentials."}, status=401)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
