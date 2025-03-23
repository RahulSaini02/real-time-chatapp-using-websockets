from flask import Blueprint, request, jsonify
from app.database import db
from app.models import User
from app.utils import hash_password

routes = Blueprint("routes", __name__)

@routes.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    profile_pic = data.get("profile_pic", None)

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 400

    try:
        hashed_password = hash_password(password)  # Secure password before saving

        new_user = User(name=name, email=email, password=hashed_password, profile_pic=profile_pic)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
