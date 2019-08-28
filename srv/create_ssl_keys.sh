#/usr/bin/bash

cd $(dirname $0)

rm -fr ./kiss_socketio.key ./kiss_socketio.crt
openssl genrsa -out ./kiss_socketio.key 2018
chmod a-w ./kiss_socketio.key
chmod go-r ./kiss_socketio.key
openssl req -new -x509 -nodes -sha256 -days 365 -key ./kiss_socketio.key -out ./kiss_socketio.crt

