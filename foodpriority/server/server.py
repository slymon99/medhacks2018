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
	dbExecute(conn, "INSERT INTO Orders VALUES(?, ?, ?, ?, ?)", (max_id + 1, request.json['contents'], jsonify(request.json['locationID']), request.json['customerID'], "Incomplete"))
	conn.commit()
	return jsonify({"id":max_id + 1})

@app.route('/api/v1.0/destinations')
def mergeOrders():

	#get all current orders
	c = dbExecute(getConnection(), 'SELECT LocationID, GROUP_CONCAT(Contents) FROM Orders GROUP BY LocationID')
	return jsonify({"results": c.fetchall()})


if __name__ == "__main__":
	app.run(debug = True)