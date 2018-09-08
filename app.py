from flask import Flask, jsonify
from db import getConnection, dbExecute
app = Flask(__name__)

import sqlite3
import json

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/v1.0/fruit')
def getFruit():
	c = dbExecute(getConnection(), 'SELECT * FROM Fruit')
	fruits = c.fetchall()
	fruits_parsed = {"results": {x[0]: x[1] for x in fruits}}
	return jsonify(fruits_parsed)

@app.route('/api/v1.0/veg')
def getFruit():
	c = dbExecute(getConnection(), 'SELECT * FROM Veg')
	veg = c.fetchall()
	veg_parsed = {"results": {x[0]: x[1] for x in veg}}
	return jsonify(veg_parsed)


if __name__ == "__main__":
	app.run(debug = True)