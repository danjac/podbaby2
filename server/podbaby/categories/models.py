from django.db import models


class Category(models.Model):
    """
    An iTunes podcast category
    """
    name = models.CharField(max_length=80, unique=True)
    parent = models.ForeignKey('self', blank=True, null=True)

    class Meta:
        ordering = ('name', )
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name
