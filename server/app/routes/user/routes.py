from flask import Blueprint, request, jsonify
from app.database import db
from app.models import User

user_routes = Blueprint("user_routes", __name__)

# Get User API
@user_routes.route("/api/users", methods=["GET"])
@user_routes.route("/api/users/<user_id>", methods=["GET"])
def users(user_id=None):
    try:
        email = request.args.get("email")  # Get email from query parameters

        if user_id is not None:
            # Fetch user by ID
            user = User.query.get(user_id)
            if not user:
                return jsonify({"error": "User not found!"}), 404

        elif email:
            # Fetch user by email
            user = User.query.filter_by(email=email).first()
            if not user:
                return jsonify({"error": "User not found!"}), 404

        else:
            # Fetch all users if no ID or email is given
            users = User.query.all()
            if not users:
                return jsonify({"error": "No users found!"}), 404

            user_list = [
                {"user_id": user.user_id, "name": user.name, "email": user.email, "profile_pic": user.profile_pic}
                for user in users
            ]
            return jsonify({"message": "List of users", "data": user_list}), 200

        # If a specific user is found (by ID or email), return their details
        user_data = {
            "user_id": user.user_id,
            "name": user.name,
            "email": user.email,
            "profile_pic": user.profile_pic,
        }
        return jsonify({"message": "User found", "data": user_data}), 200

    except Exception as e:
        db.session.rollback()
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500  # Internal server error  