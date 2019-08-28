#!/usr/bin/env python

"""
client.py
a small python socketio client
"""

from socketIO_client import SocketIO, LoggingNamespace
import requests
import logging


logging.getLogger('socketIO-client').setLevel(logging.DEBUG)
logging.basicConfig()

print("client.py says Hello!")

print("client.py says Bye!")
