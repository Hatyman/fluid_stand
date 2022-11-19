from django.db import models
from django.urls import reverse
import uuid
import datetime
import json


# Create your models here.

class Session(models.Model):
    session_id = models.UUIDField(primary_key=True,
                                  unique=True)

    started_at = models.DateTimeField()

    final_efficiency = models.FloatField(null=True)
    final_distribution_efficiency = models.FloatField(null=True)
    final_quality = models.FloatField(null=True)

    finished_at = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.session_id)

    def get_absolute_url(self):
        return reverse('session-detail', args=[str(self.session_id)])

    @classmethod
    def get(self, id: uuid.UUID):
        return Session.objects.get(pk=id)

    @classmethod
    def create_empty_session(cls):
        cls.session_id = uuid.uuid4()
        cls.started_at = datetime.date.today()
        return cls


class Telemetry(models.Model):
    telemetry_id = models.UUIDField(primary_key=True,
                                    unique=True)
    measured_at = models.DateTimeField()

    efficiency = models.FloatField(null=True)
    distribution_efficiency = models.FloatField(null=True)
    quality = models.FloatField(null=True)

    session = models.ForeignKey(Session, on_delete=models.CASCADE)

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
            sort_keys=True, indent=4)

    def __repr__(self):
        return self.__str__()

    def get_absolute_url(self):
        return reverse('operation-detail', args=[str(self.telemetry_id)])


