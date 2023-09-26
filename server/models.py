from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func 
from sqlalchemy.ext.associationproxy import association_proxy
# from sqlalchemy.dialects.postgresql import ARRAY

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user_table"

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(50),nullable=False, default="")
    last_name = db.Column(db.String(50), nullable=False,  default="")
    username = db.Column(db.String(50), unique=True, nullable=False, default="")
    password_hash = db.Column(db.String(125), nullable=False, default="")
    tdee = db.Column(db.Integer, nullable=False, default=0)

    #user and item association 
    user_that_selected_the_item = db.relationship("Item_User_Association", back_populates="user_object")

    #user and current log associatoin
    user_log_association = db.relationship("User_Current_Log_Association", back_populates="user_log")

    #user and current log + item association
    user_item_log_association = db.relationship("Item_Current_Day_Log_Association", back_populates="user_object_for_asso_table")

    def to_dict(self):
        return{"user_id": self.id, 
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "tdee": self.tdee
            }

class Item(db.Model):
    __tablename__ = "item_table"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(400), nullable = False)
    calories = db.Column(db.Integer, nullable = False)
    meal_type = db.Column(db.String(50), nullable = False)
    # current_day_log = Mapped["Current_Day_Log"] = relationship(back_populates="current_day_log_table")

    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id")) #the item is tied to the user id
    # current_day_log_id = db.Column(db.Integer, db.ForeignKey("current_day_log_table.id")) #the current_log id

    #item and user association 
    items_selected_by_user = db.relationship("Item_User_Association", back_populates="item_object") #list of users that selected the item  

    #item and current log association 
    items_log_association = db.relationship("Item_Current_Day_Log_Association", back_populates="items_in_the_log_obj") #a list of the current log objects

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "calories": self.calories,
            "user_id": self.user_id,
            "meal_type": self.meal_type,
            # "current_day_log_id": self.current_day_log_id
        }
    
class Current_Day_Log(db.Model):
    __tablename__ = "current_day_log_table"

    id = db.Column(db.Integer, primary_key= True ) 
    total_daily_calories_eaten = db.Column(db.Integer, nullable = False) #tracking the total calories user has eaten (calculated in app.py)
    date= db.Column(db.Date(), nullable = False) #keeping track of the day 
    # items = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id")) #connect the log to the specific user
    # item_id = db.Column(db.Integer, db.ForeignKey("item_table.id")) #connect the items to the log

    #current log and item association 
    current_log_and_item_association = db.relationship("Item_Current_Day_Log_Association", back_populates="current_log_of_items_obj")

    #current log and user association 
    current_log_and_user_association = db.relationship("User_Current_Log_Association", back_populates = "current_log_of_user")

    def to_dict(self):
        return {
            "id": self.id,
            "total_daily_calories_eaten": self.total_daily_calories_eaten,
            "date": self.date,
            "user_id": self.user_id,
            # "item_id": self.item_id,
        }

# associate item and user
class Item_User_Association(db.Model):  #associates the items to users 
    __tablename__ = "item_user_association"

    id = db.Column(db.Integer, primary_key = True)
    item_id = db.Column(db.Integer, db.ForeignKey("item_table.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))

    item_object = db.relationship("Item", back_populates="items_selected_by_user")  #signaling to the items that we are associating
    user_object = db.relationship("User", back_populates="user_that_selected_the_item") 



#associate item and current log 
class Item_Current_Day_Log_Association(db.Model): 
    __tablename__ = "item_and_log_association_table"

    id = db.Column(db.Integer, primary_key= True )
    current_day_log_id = db.Column(db.Integer, db.ForeignKey("current_day_log_table.id"))
    item_id = db.Column(db.Integer, db.ForeignKey("item_table.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))

    items_in_the_log_obj = db.relationship("Item", back_populates = "items_log_association")
    current_log_of_items_obj = db.relationship("Current_Day_Log", back_populates="current_log_and_item_association")
    user_object_for_asso_table = db.relationship("User", back_populates="user_item_log_association") 

# associate user and current log
class User_Current_Log_Association(db.Model):
    __tablename__ = "user_and_log_association_table"

    id = db.Column(db.Integer, primary_key= True )
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    current_day_log_id = db.Column(db.Integer, db.ForeignKey("current_day_log_table.id"))

    user_log = db.relationship("User", back_populates="user_log_association")
    current_log_of_user = db.relationship("Current_Day_Log", back_populates = "current_log_and_user_association")




