from django.db import models
from django.utils.translation import gettext_lazy as _

from paper_jsoneditor.fields import JSONField


class Sample(models.Model):
    name = models.CharField(_("name"), max_length=128)
    data = JSONField(
        _("JSON"),
        blank=True
    )

    class Meta:
        verbose_name = _("Sample")

    def __str__(self):
        return self.name
