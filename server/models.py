from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(125), nullable=False)

    food_list = db.relationship("Food_List", back_populates="user") #each user has a food log

    def to_dict(self):
        return{"user_id": self.id, "username": self.username}

class Item(db.Model):
    __tablename__ = "item_table"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(400), nullable = False)
    calories = db.Column(db.Integer, nullable = False)
    meal_type = db.Column(db.String(50), nullable = False)
    #meal type - check which button we clicked 
    #if button equals breakfast add the breakfast (can validate)
    #from the front, if statement regarding button 

    items_in_food_list = db.relationship("Item_Food_List_Association", back_populates="item_object") #items are associated with the items in the food log 

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "calories": self.calories,
            "meal_type": self.meal_type
        }

class Food_List(db.Model):     ##the actual food list created when user creates an account 
    __tablename__ = "food_list_table"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    # breakfast = db.Column(db.String(500)) - the food list doesn't need to know what meal type the food is, more important for front end 
    # lunch = db.Column(db.String(500))
    # dinner = db.Column(db.String(500))
    # snack = db.Column(db.String(500))
    # #

    user = db.relationship("User", back_populates="food_list") #connecting user and food_log --> food log is automatically created when user is created 
    food_list_for_items = db.relationship("Item_Food_List_Association", back_populates="food_list_object") #the food log has a relationship with the items in the food log  

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "items": self.food_list_for_items
        }

    #just meal type as a column in the item class 

class Item_Food_List_Association(db.Model):  #table that connects the food items to the food list 
    __tablename__ = "item_food_list_association"
    id = db.Column(db.Integer, primary_key = True)
    item_id = db.Column(db.Integer, db.ForeignKey("item_table.id"))
    food_list_id = db.Column(db.Integer, db.ForeignKey("food_list_table.id"))

    food_list_object = db.relationship("Food_List", back_populates="food_list_for_items")  #signaling to the food list that we are associating 
    item_object = db.relationship("Item", back_populates="items_in_food_list")  #signalling to the items that we are associating

# class Meals (db.Model):
#     pass 
