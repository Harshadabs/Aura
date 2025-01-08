from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def aboutus(request):
    return render(request, 'aboutus.html')

def login(request):
    return render(request, 'login.html')

def signup(request):
    return render(request, 'signup.html')

def honkaistarrail(request):
    return render(request, 'honkai star rail.html')

def mobilelegends(request):
    return render(request, 'mobilelegends.html')

def genshin(request):
    return render(request, 'genshin.html')