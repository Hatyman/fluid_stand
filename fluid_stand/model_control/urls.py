from django.urls import path, include
from . import views
from . import api

urlpatterns = [
    path('', views.index, name='index'),
    path('telemetry', api.TelemetryListAPIView.as_view(), name='api_telemetry'),
]
