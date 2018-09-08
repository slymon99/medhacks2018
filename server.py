from flask import Flask, jsonify, request
from db import getConnection, dbExecute
app = Flask(__name__)

import sqlite3
import json

@app.route('/')
def hello_world():
    return 'Hello, World!'

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
	print(request.json['contents'])
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




if __name__ == "__main__":
	app.run(debug = True)