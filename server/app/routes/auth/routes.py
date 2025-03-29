from flask import Blueprint, request, jsonify
from app.database import db
from app.models import User
from app.utils import hash_password, check_password, createJWT, decodeJWT
from dotenv import load_dotenv
import os

load_dotenv()
jwt_secret = os.getenv("JWT_SECRET")

auth_routes = Blueprint("auth_routes", __name__)

# User Registration API

@auth_routes.route("/api/auth/register", methods=["POST"])
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

# User Login API
@auth_routes.route("/api/auth/login", methods=["POST" ])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON"}), 400

        #retriving email and password from data
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Missing email or password"}), 400
        
        #Checking if User exists
        existing_user = User.query.filter_by(email=email).first()
        if not existing_user:
            return jsonify({"error": "User is not registered, create an account to use whatsapp."}), 404
        
        # validating hashed password
        if not check_password(password, existing_user.password):
            return jsonify({"error": "Invalid password"}), 401
        
        token = createJWT(email, jwt_secret, True)
        return jsonify({"message": "Login successful", "token": token}), 200
          
    except Exception as e:
        db.session.rollback()
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500  # Internal server error

@auth_routes.route("/api/auth/validate", methods=["POST"])
def validate():
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Missing credentials"}), 401
        
        # Extract token from "Bearer <token>"
        token_parts = auth_header.split()
        if len(token_parts) != 2 or token_parts[0].lower() != "bearer":
            return jsonify({"error": "Invalid token format"}), 401
        
        token = token_parts[1]

        # Decode JWT
        decoded = decodeJWT(token, jwt_secret)
        return jsonify({"message": "Authorized", "data": decoded}), 200

    except Exception as e:
        return jsonify({"error": "Not authorized", "details": str(e)}), 403
