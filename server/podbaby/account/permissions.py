from rest_framework import permissions


class IsNewUser(permissions.BasePermission):
    """
    Allows creation of new users only
    """

    def has_permission(self, request, view):
        if request.method == "POST":
            return request.user.is_anonymous()
        return False
