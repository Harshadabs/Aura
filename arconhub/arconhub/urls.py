from django.urls import path
from django.views.generic import TemplateView
from django.conf import settings
import os

# Correct the path to index.html
index_file_path = os.path.join(settings.BASE_DIR, 'frontend', 'build', 'index.html')

urlpatterns = [
    # Serve the React app's index.html
    path('', TemplateView.as_view(template_name='index.html')),  # Corrected path
]

# Serve static files in development
if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
