from flask import Flask
from flask import request
from flask import Response
import json
from flask_cors import CORS


import sqlite3
app = Flask(__name__)
CORS(app)

resp = Response()
resp.headers['Access-Control-Allow-Origin'] = '*'


@app.route('/score', methods=['GET', 'POST'])
def scores():
    try:
        db = sqlite3.connect('score.db')
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute("SELECT count(name) FROM sqlite_master WHERE type='table' AND name='score'")
        if cursor.fetchone()[0] == 1:
            pass
        else:
            sql = """
                CREATE TABLE "score" (
                    "name"	TEXT,
                    "score"	INTEGER,
                    PRIMARY KEY("name")
                )
            """
            cursor.execute(sql)
            db.commit()
        
        if request.method == 'GET':
            sql = "SELECT * FROM score"
            cursor.execute(sql)
            scores = cursor.fetchall()
            output = []
            for score in scores:
                output.append({'name':score['name'], 'score':score['score']})
            resp.set_data(json.dumps(output))
            return resp
        elif request.method == 'POST':
            form = request.get_json()
            sql = "SELECT * FROM score WHERE name='%(name)s'" % {'name':form['name']}
            cursor.execute(sql)
            target=cursor.fetchall()
            if target:
                if target[0]['score'] < form['score']:
                    sql = """
                    UPDATE score SET score=%(score)s where name='%(name)s'""" % {'name':form['name'], 'score':form['score']}
            else:
                sql = """
                    INSERT INTO score (name, score) 
                    VALUES(
                        '%(name)s',
                        %(score)s
                    )
                    """ % {'name':form['name'], 'score':form['score']}
            cursor.execute(sql)
            db.commit()
            output = json.dumps({'name':form['name'], 'score':form['score'] })
            resp.set_data(output)
            return resp
    except Exception as e:
        pass
    finally:
        cursor.close()
        db.close()

@app.route('/')
def index():
    return resp

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')