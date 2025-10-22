from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User  # If using default User model
from django.contrib.auth import authenticate
import json
import hashlib

@csrf_exempt
def signup_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            email = data.get("email")
            password = data.get("password")
            first_name = data.get("first_name", "")
            last_name = data.get("last_name", "")
            contact_no = data.get("contact_no", "")

            if User.objects.filter(username=email).exists():
                return JsonResponse({"error": "User already exists!"}, status=400)

            user = User.objects.create_user(
                username=email,  # using email as username
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )
            user.profile.contact_no = contact_no  # if contact_no is in a separate Profile model
            user.save()

            return JsonResponse({"message": "Signup successful!"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=405)


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            email = data.get("email")
            password = data.get("password")

            user = authenticate(username=email, password=password)
            if user:
                return JsonResponse({"message": f"Welcome, {user.first_name}!"}, status=200)
            else:
                return JsonResponse({"error": "Invalid email or password"}, status=401)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=405)
