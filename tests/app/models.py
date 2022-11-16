from django.db import models
from django.utils.translation import gettext_lazy as _

from paper_jsoneditor.fields import OrderedJSONField


class Sample(models.Model):
    name = models.CharField(_("name"), max_length=128)
    ordered_json = OrderedJSONField(
        _("JSON (order preserved)"),
        blank=True
    )

    class Meta:
        verbose_name = _("Sample")

    def __str__(self):
        return self.name
