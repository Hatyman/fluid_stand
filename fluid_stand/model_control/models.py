from django.db import models
from django.urls import reverse


# Create your models here.

class Session(models.Model):
    session_id = models.UUIDField(primary_key=True,
                                  unique=True,
                                  db_index=True)

    started_at = models.DateTimeField()

    final_efficiency = models.FloatField(null=True)
    final_distribution_efficiency = models.FloatField(null=True)
    final_quality = models.FloatField(null=True)

    finished_at = models.DateTimeField(null=True)

    def __str__(self):
        return self.session_id

    def get_absolute_url(self):
        return reverse('session-detail', args=[str(self.session_id)])


class Operation(models.Model):
    operation_id = models.UUIDField(primary_key=True,
                                    unique=True,
                                    db_index=True)
    started_at = models.DateTimeField()

    efficiency = models.FloatField(null=True)
    distribution_efficiency = models.FloatField(null=True)
    quality = models.FloatField(null=True)

    finished_at = models.DateTimeField(null=True)

    session = models.ForeignKey(Session, on_delete=models.CASCADE)

    def __str__(self):
        return self.operation_id

    def get_absolute_url(self):
        return reverse('operation-detail', args=[str(self.operation_id)])
