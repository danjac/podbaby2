from django import forms
from channels.models import Channel


class ChannelAdminForm(forms.ModelForm):

    class Meta:
        model = Channel
        fields = (
            'rss_feed',
            'name',
            'link',
            'description',
            'explicit',
            'copyright',
            'creative_commons',
            'image',
            'categories',
        )

    def __init__(self, *args, **kwargs):
        super(ChannelAdminForm, self).__init__(*args, **kwargs)
        for field in (
            'rss_feed',
            'link',
            'copyright',
            'creative_commons',
        ):
            self.fields[field].widget = forms.TextInput(
                attrs={
                    'class': 'vTextField',
                    },
            )
