import sqlite3

def getConnection():
	return sqlite3.connect('application.db')

def dbExecute(conn, command, args = None):
	c = conn.cursor()
	if args:
		return c.execute(command, args)
	else:
		return c.execute(command)

