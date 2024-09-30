from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__) #init flask
CORS(app)#frontend and backend can comm now

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db" #where sqllite db is stored
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False #we wont track all modif rn

db = SQLAlchemy(app) #create instance of db to crud