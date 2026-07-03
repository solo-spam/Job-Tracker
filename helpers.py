# helpers.py
from functools import wraps
from flask import session, redirect
import re

# -----------------------------
# Login required decorator
# -----------------------------
def login_required(f):
    """
    Decorator to ensure a user is logged in before accessing a route.
    Redirects to /login if not authenticated.
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function


# -----------------------------
# Password validation
# -----------------------------
def validate_password(password):
    """
    Returns True if the password is strong enough:
    - At least 8 characters
    - Contains at least one number
    - Contains at least one special character
    """
    if len(password) < 8:
        return False
    if not re.search(r"\d", password):
        return False
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False
    return True


# -----------------------------
# Username validation
# -----------------------------
def validate_username(username):
    """
    Returns True if the username is valid (alphanumeric and underscores only)
    """
    return bool(re.match(r"^\w+$", username))


# -----------------------------
# Optional: format date helper
# -----------------------------
def format_date(date_obj):
    """
    Converts a datetime.date object to a readable string, e.g., "2025-12-23"
    """
    return date_obj.strftime("%Y-%m-%d")

