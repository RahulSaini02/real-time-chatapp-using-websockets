from flask import Blueprint, request, jsonify
from app.database import db
from app.models import User
from app.utils import hash_password

routes = Blueprint("routes", __name__)

@routes.route("/api/register", methods=["POST"])
def register():
  try:
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400
        
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    profile_pic = data.get("profile_pic", None)

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already registered"}), 409  # Conflict error

    hashed_password = hash_password(password)

    new_user = User(name=name, email=email, password=hashed_password, profile_pic=profile_pic)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

  except Exception as e:
      db.session.rollback()
      print("Error:", str(e))
      return jsonify({"error": str(e)}), 500  # Internal server error
