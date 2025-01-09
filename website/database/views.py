from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import User
import hashlib

def signup_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")

        # Hash the password
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        # Check for duplicate users
        if User.objects.filter(username=username).exists():
            return HttpResponse("Username already exists!", status=400)
        if User.objects.filter(email=email).exists():
            return HttpResponse("Email already exists!", status=400)

        # Save the user to the database
        User.objects.create(username=username, email=email, password=hashed_password)
        return redirect('/')

    return render(request, "signup.html")

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        # Authenticate the user
        user = User.objects.filter(username=username, password=hashed_password).first()
        if user:
            # Successful login (add session handling if needed)
            return HttpResponse(f"Welcome, {user.username}!")
        else:
            return HttpResponse("Invalid username or password!", status=401)

    return render(request, "login.html")
