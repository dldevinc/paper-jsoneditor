from django.contrib import admin

from .models import Sample


@admin.register(Sample)
class SampleAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            "fields": (
                "name", "data"
            ),
        }),
    )
    search_fields = ["name"]
