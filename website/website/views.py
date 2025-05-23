from django.shortcuts import render
from django.shortcuts import redirect

def custom_404(request, exception):
    return redirect('index')  # Redirect to the home page

def index(request):
    return render(request, 'index.html')

def aboutus(request):
    return render(request, 'aboutus.html')

def login(request):
    return render(request, 'login.html')

def signup(request):
    return render(request, 'signup.html')

def logout(request):
    return redirect('index')