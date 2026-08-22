from django.contrib.sitemaps import Sitemap
from django.urls import reverse

class StaticViewSitemap(Sitemap):
    changefreq = 'monthly'
    priority = 0.6

    def items(self):
        return [
            'dashboard_page', 'register_single', 'register_group', 'login', 'profile', 'scoring',
            'guidelines', 'successfull',
        ]

    def location(self, obj):
        return reverse(obj)
