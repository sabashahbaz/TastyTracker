from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Food_Items(db.Model):
    __tablename__ = "food_items"
    
    id = db.Column(db.Integer, primary_key=True)
