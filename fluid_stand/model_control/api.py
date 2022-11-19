from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView
from . import serializers
from . import models
from django.http import HttpResponse
import uuid
import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse


class TelemetryListAPIView(ListAPIView, CreateAPIView, DestroyAPIView):
    serializer_class = serializers.TelemetrySerializer

    def get_queryset(self):
        return models.Telemetry.objects.all()

    def post(self, request, *args, **kwargs):
        telemetry_data = JSONParser().parse(request)
        telemetry_serializer = self.serializer_class(data=telemetry_data)
        if telemetry_serializer.is_valid():
            response_instance = telemetry_serializer.create(validated_data=telemetry_data)
            return JsonResponse(response_instance, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        models.Telemetry.objects.all().delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
