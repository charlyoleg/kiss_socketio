#!/usr/bin/env python

"""
client.py
a small python socketio client
"""

import requests
import logging
import time
import json
#import socketio give-up because of self-certification issue
from socketIO_client_nexus import SocketIO, LoggingNamespace

import os
print(os.environ.get('PYTHONHTTPSVERIFY'))


##########################################################
# logging
##########################################################

### remove urllib3 warnings about self-certificate
requests.packages.urllib3.disable_warnings(requests.packages.urllib3.exceptions.InsecureRequestWarning)

### logger
#logging.getLogger('urllib3').setLevel(logging.INFO)
logger = logging.getLogger('')
logger.setLevel(logging.DEBUG)
#logger.setLevel(logging.NOTSET)
logger.addHandler(logging.StreamHandler())


##########################################################
# sockeio registration
##########################################################


def on_update_result(data):
  one_total = parseFloat(data)
  print('Update result to {:.02f}'.format(one_total))

def on_connect():
  print("client_py connected!")

def on_disconnect():
  print("client_py disconnected!")

def on_reconnect():
  print('client_pyreconnect')


### let's start
socketIO = SocketIO('https://127.0.0.1', 8005, LoggingNamespace, verify=False)
socketIO.on('connect', on_connect)
socketIO.on('disconnect', on_disconnect)
socketIO.on('reconnect', on_reconnect)
# real stuff
socketIO.on('update result', on_update_result)

# wait a bit to check whats happen
time.sleep(1.0)


##########################################################
# sub-function
##########################################################

def get_group_result():
  "requests GET on group_result"
  r = requests.get('https://localhost:8005/group_result', verify=False)
  if (r.status_code == 200):
    logger.info('group_result: {:d}'.format(r.json()['total']))
  else:
    logger.error('ERR027: Error by GET /group_result')

def post_contribute(point):
  "requests POST on /contribute"
  payload_json = {"contrib": "{:d}".format(point)}
  r = requests.post('https://localhost:8005/contribute', json=payload_json, verify=False)
  if (r.status_code == 200):
    #print(r.text)
    logger.info('new total: {:d}'.format(r.json()['total']))
  else:
    logger.error('ERR027: Error by POST /contrib')


##########################################################
# main
##########################################################

### Hello
logger.info("client.py says Hello!")

### requests sequence
get_group_result()
post_contribute(5)
post_contribute(9)
get_group_result()

### Bye
time.sleep(0.5)
logger.info("client.py says Bye!")

