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
	res = c.fetchall()
	return jsonify({"results": res})

if __name__ == "__main__":
	app.run(debug = True)