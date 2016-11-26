from django import forms
from episodes.models import Episode


class EpisodeAdminForm(forms.ModelForm):

    class Meta:
        model = Episode
        fields = (
            'link',
            'title',
            'explicit',
            'subtitle',
            'description',
            'summary',
            'author',
            'published',
            'duration',
            'enclosure_url',
            'enclosure_length',
            'enclosure_type',
        )

    def __init__(self, *args, **kwargs):
        super(EpisodeAdminForm, self).__init__(*args, **kwargs)
        for field in (
            'link',
            'title',
            'author',
            'enclosure_url',
        ):
            self.fields[field].widget = forms.TextInput(
                attrs={
                    'class': 'vTextField',
                },
            )
