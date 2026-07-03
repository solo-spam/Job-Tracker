import os
from flask import Flask, render_template, request, redirect, session
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from cs50 import SQL
from functools import wraps
from helpers import login_required, validate_password, validate_username

# Configure application
app = Flask(__name__)
app.secret_key = "2006"
# Configure session
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure database
db = SQL("sqlite:///tracker.db")

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True



# -------------------- ROUTES --------------------

@app.route("/")
@login_required
def index():
    """Show all job applications"""
    applications = db.execute(
        "SELECT * FROM applications WHERE user_id = ? ORDER BY applied_date DESC",
        session["user_id"],
    )
    return render_template("dashboard.html", applications=applications)


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")

        # Validate inputs
        if not username or not password:
            return render_template("register.html", error="Username and password required")

        if not validate_username(username):
            return render_template("register.html", error="Username can only contain letters, numbers, and underscores")

        if not validate_password(password):
            return render_template("register.html", error="Password must be at least 8 characters long, contain a number and a special character")

        # Check if username already exists
        existing_user = db.execute("SELECT * FROM users WHERE username = ?", username)
        if existing_user:
            return render_template("register.html", error="Username already taken")
        hash_pw = generate_password_hash(password, method="pbkdf2:sha256")
        db.execute("INSERT INTO users (username, hash) VALUES (?, ?)", username, hash_pw)

        return redirect("/login")
    else:
        return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")

        # Validate input
        if not username or not password:
            return render_template("login.html", error="Username and password required")

        # Optional: validate username format
        if not validate_username(username):
            return render_template("login.html", error="Invalid username format")

        # Lookup user
        user = db.execute("SELECT * FROM users WHERE username = ?", username)
        if len(user) != 1 or not check_password_hash(user[0]["hash"], password):
            return render_template("login.html", error="Invalid username or password")

        # Set session
        session.clear()
        session["user_id"] = user[0]["id"]

        return redirect("/")
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""
    session.clear()
    return redirect("/login")


@app.route("/add", methods=["GET", "POST"])
@login_required
def add():
    """Add new job application"""
    if request.method == "POST":
        db.execute(
            """
            INSERT INTO applications
            (user_id, company, role, status, applied_date, follow_up, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            session["user_id"],
            request.form.get("company"),
            request.form.get("role"),
            request.form.get("status"),
            request.form.get("applied_date"),
            request.form.get("follow_up"),
            request.form.get("notes"),
        )
        return redirect("/")

    return render_template("add.html")


@app.route("/edit/<int:app_id>", methods=["GET", "POST"])
@login_required
def edit(app_id):
    """Edit job application"""
    if request.method == "POST":
        db.execute(
            """
            UPDATE applications
            SET company = ?, role = ?, status = ?, follow_up = ?, notes = ?
            WHERE id = ? AND user_id = ?
            """,
            request.form.get("company"),
            request.form.get("role"),
            request.form.get("status"),
            request.form.get("follow_up"),
            request.form.get("notes"),
            app_id,
            session["user_id"],
        )
        return redirect("/")

    application = db.execute(
        "SELECT * FROM applications WHERE id = ? AND user_id = ?",
        app_id,
        session["user_id"],
    )

    return render_template("edit.html", application=application[0])


@app.route("/delete/<int:app_id>")
@login_required
def delete(app_id):
    """Delete application"""
    db.execute(
        "DELETE FROM applications WHERE id = ? AND user_id = ?",
        app_id,
        session["user_id"],
    )
    return redirect("/")


