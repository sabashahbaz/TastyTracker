from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user_table"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(125), nullable=False)
    # tdee = db.Column(db.Integer(50), nullable=False)
    # total_calories_eaten = db.Column(db.Integer(100), nullable=False)

    user_table = db.relationship("Item_User_Association", back_populates="user_object")
    # user_table = db.relationship("Total_Calories", back_populates="user_object")

    

    def to_dict(self):
        return{"user_id": self.id, "username": self.username}

class Item(db.Model):
    __tablename__ = "item_table"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(400), nullable = False)
    calories = db.Column(db.Integer, nullable = False)
    meal_type = db.Column(db.String(50), nullable = False)

    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id")) #the item is tied to the user id

    items_selected_by_user = db.relationship("Item_User_Association", back_populates="item_object") #items are associated with the items in the food log 

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "calories": self.calories,
            "user_id": self.user_id,
            "meal_type": self.meal_type
        }

class Item_User_Association(db.Model):  #associates the items to users 
    __tablename__ = "item_user_association"
    id = db.Column(db.Integer, primary_key = True)
    item_id = db.Column(db.Integer, db.ForeignKey("item_table.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))

    item_object = db.relationship("Item", back_populates="items_selected_by_user")  #signalling to the items that we are associating
    user_object = db.relationship("User", back_populates="user_table")

    def to_dict(self):
        return {
            "id": self.id,
            "item_id": self.item_id,
            "user_id": self.user_id
        }
    
# class Total_Calories(db.Model):
#     __tablename__ = "total_calories_table"

#     id=db.Column(db.Integer, primary_key = True)
#     total_calories = db.Column(db.Integer, nullable = False)

#     user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))

#     user_object = db.relationship("User", back_populates="user_table")

    #many to many relationship between food items and food list 

