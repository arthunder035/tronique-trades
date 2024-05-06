from dotenv import load_dotenv
from flask import Flask, jsonify, Response, request
from flask_cors import CORS
import pandas as pd
import os
from vanna.remote import VannaDefault
import sys

load_dotenv()
app = Flask(__name__, static_url_path="")
CORS(app, resources={r"/api/*": {"origins": "*"}})

# VANNA INITIALIZATION
def initialize_vanna(model_env_var, key_env_var, sqlite_path):
    vanna_key = os.environ.get(key_env_var)
    model = os.environ.get(model_env_var)
    vn = VannaDefault(model=model, api_key=vanna_key)
    vn.connect_to_sqlite(sqlite_path)
    return vn

# Initialize Vanna for trades
vn_trades = initialize_vanna("VANNA_MODEL_TRADES", "VANNA_API_KEY_TRADES", 'D:/tronique-new/database/tron')

# Initialize Vanna for forum
vn_forum = initialize_vanna("VANNA_MODEL_FORUM", "VANNA_API_KEY_FORUM", 'D:/tronique-new/database/TronForumData')

@app.route("/api/v1/trades/generate_questions", methods=["GET"])
def generate_trades_questions():
    return jsonify(
        {
            "type": "question_list",
            "questions": vn_trades.generate_questions(),
            "header": "Here are some questions you can ask:",
        }
    )


@app.route("/api/v1/forum/generate_questions", methods=["GET"])
def generate_forum_questions():
    return jsonify(
        {
            "type": "question_list",
            "questions": vn_forum.generate_questions(),
            "header": "Here are some questions you can ask:",
        }
    )
    

@app.route("/api/v1/trades/generate_and_run_sql", methods=["GET"])
def generate_and_run_trades_sql():
    question = request.args.get("question")
    if question is None:
        return jsonify({"type": "error", "error": "No question provided"})
    
    try:
        sql = vn_trades.generate_sql(question=question)
        df = vn_trades.run_sql(sql=sql)
        return jsonify({"type": "df", "df": df.head(10).to_json(orient="records")})
    except Exception as e:
        return jsonify({"type": "error", "error": str(e)})
    

@app.route("/api/v1/forum/generate_and_run_sql", methods=["GET"])
def generate_and_run_forum_sql():
    question = request.args.get("question")
    if question is None:
        return jsonify({"type": "error", "error": "No question provided"})
    
    try:
        sql = vn_forum.generate_sql(question=question)
        df = vn_forum.run_sql(sql=sql)
        return jsonify({"type": "df", "df": df.head(10).to_json(orient="records")})
    except Exception as e:
        return jsonify({"type": "error", "error": str(e)})
    

@app.route('/api/v1/trades/generate_plotly_figure', methods=['GET'])
def generate_trades_plotly_figure():
    question = request.args.get('question')
    sql = vn_trades.generate_sql(question=question)
    df = vn_trades.run_sql(sql=sql)

    try:
        code = vn_trades.generate_plotly_code(question=question, sql=sql, df_metadata=f"Running df.dtypes gives:\n {df.dtypes}")
        fig = vn_trades.get_plotly_figure(plotly_code=code, df=df, dark_mode=False)
        fig_json = fig.to_json()

        return jsonify(
            {
                "type": "fig", 
                "question": question,
                "fig": fig_json,
            })
    except Exception as e:
        # Print the stack trace
        import traceback
        traceback.print_exc()

        return jsonify({"type": "error", "error": str(e)})
    

@app.route('/api/v1/forum/generate_plotly_figure', methods=['GET'])
def generate_forum_plotly_figure():
    question = request.args.get('question')
    sql = vn_forum.generate_sql(question=question)
    df = vn_forum.run_sql(sql=sql)

    try:
        code = vn_forum.generate_plotly_code(question=question, sql=sql, df_metadata=f"Running df.dtypes gives:\n {df.dtypes}")
        fig = vn_forum.get_plotly_figure(plotly_code=code, df=df, dark_mode=False)
        fig_json = fig.to_json()

        return jsonify(
            {
                "type": "fig", 
                "question": question,
                "fig": fig_json,
            })
    except Exception as e:
        # Print the stack trace
        import traceback
        traceback.print_exc()

        return jsonify({"type": "error", "error": str(e)})
    

# @app.route("/api/hello", methods=["GET"])
# def generate_forum_plotly_figure():
#     return jsonify("Hello")


if __name__ == "__main__":
    app.run(debug=True)
