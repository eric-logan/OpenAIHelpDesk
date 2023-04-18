# OpenAI HelpDesk Chatbot - webserver
# Author: Eric Logan
# This flask webapp will be used to process and return OpenAI responses to the Chrome Extension
from flask import Flask, request, jsonify
import openai
import json
import datetime
openai.api_key = "[OPENAI API KEY]"

print("OpenAI HelpDesk Chatbot")


def greetings():
    current_time = datetime.datetime.now()
    if current_time.hour < 12:
        return "Good Morning,"
    elif 12 <= current_time.hour < 18:
        return "Good Afternoon,"
    else:
        return "Good Evening,"


def body(ticket_meta):
    f = open('message.json')
    data = json.load(f)
    msg = data[ticket_meta]
    return msg


def signature():
    # Techs name used at the bottom of signature
    f = open('info.json')
    data = json.load(f)
    name = data['Name']
    farewell = data['Farewell']
    sig = data['signature']
    f.close()
    return farewell, name, sig


def chat(ticket_meta):
    # Construct help desk message
    header = greetings()
    msg = body(ticket_meta)
    sig = signature()[0] + "\n" + signature()[1] + "\n" + signature()[2]
    talk = str(header + "\n") + str(msg + "\n") + str(sig)
    return talk


def ai(ticket):

    if ticket == "Close Ticket" or ticket == "Follow Up":
        return chat(ticket)
    else:
        res = openai.Completion.create(
            model="",
            prompt=ticket + "\n\n###\n\n",
            stop=['.', ';', ':'],
            max_tokens=3,
            temperature=0
        )
        # print(res["choices"][0]['text'])
        return chat(res["choices"][0]['text'])


app = Flask(__name__)


@app.route("/", methods=['POST', 'GET'])
def helpdesk():
    if request.method == "POST":
        client_ticket = request.form.get('ticket')
        print(ai(client_ticket))
        response = jsonify(ai(client_ticket))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        return "<p>Hello, World!</p>"
