from rest_framework import serializers
from django.forms.models import model_to_dict
from .models import Session, Telemetry
import datetime
import uuid
import json


class TelemetrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Telemetry
        fields = ('telemetry_id', 'measured_at', 'efficiency', 'distribution_efficiency', 'quality', 'session')
        read_only_fields = ['telemetry_id', 'session']

    def create(self, validated_data):
        s = Session.get(id=uuid.UUID('a6914153-3a61-4258-b38a-5dc42a8ba642'))
        telemetry = Telemetry(
            telemetry_id=uuid.uuid4(),
            measured_at=validated_data['measured_at'],
            efficiency=validated_data['efficiency'],
            distribution_efficiency=validated_data['distribution_efficiency'],
            quality=validated_data['quality'],
            session=s
        )
        telemetry.save()
        return model_to_dict(telemetry)


class Message():
    def __init__(self, message: str):
        self.message: str = message

    def to_json(self):
        return self.__dict__


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)


