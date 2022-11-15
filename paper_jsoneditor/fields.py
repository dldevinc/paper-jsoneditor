from django.db import models

from . import forms


class JSONField(models.JSONField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("default", dict)
        super().__init__(*args, **kwargs)

    def get_internal_type(self):
        # Используется поля БД типа TEXT.
        # Это делает невозможным использование JSON-операторов, таких как "->" и "@>",
        # но позволяет сохранить порядок ключей.
        return "TextField"

    def formfield(self, **kwargs):
        return super().formfield(
            **{
                "form_class": forms.JSONField,
                **kwargs,
            }
        )
