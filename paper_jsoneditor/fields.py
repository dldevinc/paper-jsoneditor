from django.db import models

from . import forms


class JSONField(models.JSONField):
    empty_values = [None, "", ()]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("default", dict)
        super().__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        return super().formfield(
            **{
                "form_class": forms.JSONField,
                **kwargs,
            }
        )


class OrderedJSONField(JSONField):
    def db_type(self, connection):
        if connection.vendor == "postgresql":
            return "json"

        internal_type = "TextField"
        data = self.db_type_parameters(connection)
        try:
            return connection.data_types[internal_type] % data
        except KeyError:
            return None
