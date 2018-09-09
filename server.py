from flask import Flask, jsonify, request, render_template, abort
from db import getConnection, dbExecute

app = Flask(__name__)

import sqlite3
import json

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1.0/fruit')
def getFruit():
	return getItems("Fruit")

@app.route('/api/v1.0/veg')
def getVeg():
	return getItems("Vegetable")

def getItems(category):
	c = dbExecute(getConnection(), 'SELECT * FROM Items WHERE Type = ?', (category,))
	items = c.fetchall()
	parsed = {"results": {x[1]: x[2] for x in items}}
	return jsonify(parsed)

@app.route('/api/v1.0/addOrder', methods=["POST"])
def addOrder():
	if not request.json:
		abort(400)
	
	#get current max id
	c = dbExecute(getConnection(), 'SELECT max(ID) from Orders')
	max_id = c.fetchone()[0]
	if not max_id:
		max_id = 0

	conn = getConnection()
	dbExecute(conn, "INSERT INTO Orders VALUES(?, ?, ?, ?, ?)", (max_id + 1, json.dumps(request.json['contents']), request.json['locationID'], request.json['customerID'], "Incomplete"))
	conn.commit()
	return jsonify({"id":max_id + 1})

@app.route('/api/v1.0/destinations')
def mergeOrders():

	#get all current orders
	c = dbExecute(getConnection(), 'SELECT Contents, LocationID, CustomerID FROM Orders')
	combined = {}

	for order in c.fetchall():
		contents = json.loads(order[0])
		location = order[1]
		customer = order[2]

		formatted = {"customer": customer, "location": location,"contents":contents}
		if location in combined:
			combined[location].append(formatted)
		else:
			combined[location] = [formatted]

	return jsonify(combined)

@app.route('/api/v1.0/locations')
def getLocations():
	c = dbExecute(getConnection(), 'SELECT * FROM Locations')
	return(jsonify({"locations":[{"Name":x[0], "Latitude":x[1], "Longitude":x[2], "ID":x[3]} for x in c.fetchall()]}))

@app.route('/api/v1.0/login', methods = ['POST'])
def login():
	username = request.json['username']
	password = request.json['password']
	c = dbExecute(getConnection(), 'SELECT ID FROM Users WHERE username=? AND password=?', (username, password,))
	result = c.fetchone()
	if result:
		return jsonify({"id":result[0], "username":username})
	else:
		abort(401)

@app.route('/api/v1.0/register', methods = ['POST'])
def register():
	#get current max id
	c = dbExecute(getConnection(), 'SELECT max(ID) from Users')
	max_id = c.fetchone()[0]
	if not max_id:
		max_id = 0

	conn = getConnection()
	dbExecute(conn, "INSERT INTO Users VALUES(?, ?, ?, ?, ?)", (max_id + 1, request.json['username'], request.json['password'], request.json['first'], request.json['last']))
	conn.commit()

	return jsonify({"id":max_id + 1, "username": request.json['username']})


if __name__ == "__main__":
	app.run(debug = True)