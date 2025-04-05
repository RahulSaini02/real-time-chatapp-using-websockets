import bcrypt
import jwt, datetime, os

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def check_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))

def createJWT(user_id, name, email, profile_pic, secret, authz):
    encoded_jwt = jwt.encode({
            "user_id": user_id,
            "name": name,
            "email": email,
            "profile_pic": profile_pic,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24),
            "iat": datetime.datetime.utcnow(),
            "admin": authz
        }, 
        secret, 
        algorithm="HS256"
    )
    return encoded_jwt

def decodeJWT(encoded_jwt, secret):
    try:
        decoded_jwt = jwt.decode(encoded_jwt, secret, algorithms=["HS256"])
        return decoded_jwt
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired"}
    except jwt.InvalidTokenError:
        return {"error": "Invalid token"}
