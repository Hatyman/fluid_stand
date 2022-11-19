from django.contrib import admin
from .models import Session, Telemetry


# Register your models here.
class SessionAdmin(admin.ModelAdmin):
    list_display = ('started_at',
                    'finished_at',
                    'final_efficiency',
                    'final_distribution_efficiency',
                    'final_quality',
                    )


admin.site.register(Session, SessionAdmin)


class TelemetryAdmin(admin.ModelAdmin):
    list_display = ('telemetry_id',)

admin.site.register(Telemetry, TelemetryAdmin)


