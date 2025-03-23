from flask import Blueprint, request, jsonify
from flask import Request, Response


router = Blueprint('routes', __name__)

@router.route('/api/register', methods=['GET', 'POST'])
def register():
  data = request.json

  print(f"User Data: {data}")

  # Basic validation
  if not data.get("name") or not data.get("email") or not data.get("password"):
      return jsonify({"message": "All fields are required!"}), 400

  return jsonify({"message": f"User {data['name']} registered successfully!"}), 201