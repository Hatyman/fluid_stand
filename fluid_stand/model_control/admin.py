from django.contrib import admin
from .models import Session, Operation


# Register your models here.
class SessionAdmin(admin.ModelAdmin):
    list_display = ('started_at',
                    'finished_at',
                    'final_efficiency',
                    'final_distribution_efficiency',
                    'final_quality',
                    )


admin.site.register(Session, SessionAdmin)


@admin.register(Operation)
class OperationAdmin(admin.ModelAdmin):
    list_display = ('operation_id',)

