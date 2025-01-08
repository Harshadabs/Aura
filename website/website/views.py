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

def honkai(request):
    return render(request, 'honkai star rail.html')

def mobilelegends(request):
    return render(request, 'mobilelegends.html')

def genshin(request):
    return render(request, 'genshin.html')