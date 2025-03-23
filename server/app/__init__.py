import os
from flask import Flask
from flask_cors import CORS

def create_app():
    # create and configure the app
    app = Flask(__name__)
    CORS(app)

    return app