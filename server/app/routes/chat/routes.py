from flask import Blueprint, request, jsonify
from app.database import db
from app.models import Chats, ChatParticipants
from sqlalchemy import select
from sqlalchemy.orm import sessionmaker, aliased
from sqlalchemy import create_engine, text
from app.config import DATABASE_URL

chat_routes = Blueprint("chat_routes", __name__)

# User Registration API

@chat_routes.route("/api/chats/new", methods=["POST"])
def new_chat():
  try:
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400
    
    is_group = data.get("is_group") or False
    group_name = data.get("group_name") or None
    sender_user_id = data.get("sender_user_id")
    recipent_user_id = data.get("recipent_user_id")

    # Check IF chat already exists

    # Create engine and session
    engine = create_engine(DATABASE_URL)
    Session = sessionmaker(bind=engine)
    session = Session()

    a = aliased(ChatParticipants)
    b = aliased(ChatParticipants)  

    query = (
      select(a.chat_id, a.user_id.label("user1"), b.user_id.label("user2"))
      .select_from(a)
      .join(b, a.chat_id == b.chat_id)
      .where(a.user_id == sender_user_id and a.is_group == false)
      .where(b.user_id == recipent_user_id)
      .distinct()
    )

    results=db.session.execute(query).fetchall()

    if len(results)==0:
      # No chat exists -- create a new chat.
      new_chat = Chats(is_group=is_group, group_name=group_name)
      db.session.add(new_chat)
      db.session.flush() # to get created Id

      new_chat_id = new_chat.chat_id


      sender_chat_participant = ChatParticipants(new_chat_id, sender_user_id)
      recipent_chat_participant = ChatParticipants(new_chat_id, recipent_user_id)

      db.session.add(sender_chat_participant)
      db.session.add(recipent_chat_participant)

      db.session.commit()

      return jsonify({"message": "New chat created successfully", "data": {"chat_id": new_chat_id}}), 201
  
    return jsonify({"message":"Chat already exists", "data":{"chat_id":results[0][0]}})


  except Exception as e:
      db.session.rollback()
      print("Error:", str(e))
      return jsonify({"error": str(e)}), 500  # Internal server error