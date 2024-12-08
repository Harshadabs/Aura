from django.shortcuts import render
from django.http import HttpResponse
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def index(request):
    # Open and return the contents of the index.html file
    with open(os.path.join(BASE_DIR, 'frontend/build/index.html')) as f:
        return HttpResponse(f.read())
