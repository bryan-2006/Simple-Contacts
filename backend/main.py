from flask import request, jsonify
from config import app, db
from models import Contact


@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all() #Flask SQL Alchemy, our ORM, to get our contacts in db
    json_contacts = list(map(lambda x: x.to_json(), contacts)) #converting our python to json
    return jsonify({"contacts": json_contacts}) #"contacts" is a key associated with json_contacts

#root for creating
@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    
    if not first_name or not last_name or not email:
        return {
            jsonify({"message": "You must include first name, last name, and email"}), 
            400 #bad request
        }
    
    new_contact = Contact(first_name=first_name, last_name = last_name, email = email) #new Contact obj
    try:
        db.session.add(new_contact) #add new Contact obj to db (staging area)
        db.session.commit() #commit write changes to db
    except Exception as e:
        return jsonify({"message": str(e)}), 400 #incase things dont work out
    
    return jsonify({"message": "New contact created"}), 201 #201 = created


#root for update
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id) #get the contact to update
    
    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    #if firstName key exists we get that value and if not the current firstname is default
    contact.first_name = data.get("firstName", contact.first_name) 
    contact.last_name = data.get("lastName", contact.last_name) 
    contact.email = data.get("email", contact.email) 
    
    db.session.commit()
    
    return jsonify({"message": "Contact updated"}), 200


#delete root
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id) #get the contact to update
    
    if not contact:
        return jsonify({"message": "User not found"}), 404
        
    db.session.delete(contact)
    db.session.commit()
    
    return jsonify({"message": "Contact deleted"}), 200



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    
    app.run(debug=True)