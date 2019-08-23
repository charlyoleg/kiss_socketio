======================
Notes on kiss_socketio
======================


Presentation
============

*kiss_socketio* is a small sandbox project to discover the javascript library socket.io_.

.. _socket.io : https://socket.io

It contains the client side and the server side.

See also *Socket.io* on github_ and npmjs_.

.. _github : https://github.com/socketio/socket.io
.. _npmjs : https://www.npmjs.com/package/socket.io


Topology
========

Servers
-------

This repo contains one WebSocket server in the directory *srv*. It serves html, css and js. It acts as a REST Api. And it provides the WebSocket service.


Clients
-------

This repo contains three clients that consumes the WebSocket service:

- web : it uses the WebSocket service from the browser
- client_js : it uses the WebSocket service from a nodejs-application based on the package socket.io-client_
- client_py : it uses the WebSocket service from a python-application based on the package python-socketio_

.. _socket.io-client : https://www.npmjs.com/package/socket.io-client
.. _python-socketio : https://pypi.org/project/python-socketio/


Npm packages
============

ncp versu cpx
-------------

ncp_ is much more populare but doesn't have the feature *watch*. cpx_ has the feature *watch*, has dependencies and one minor vulnerability.

.. _ncp : https://www.npmjs.com/package/ncp
.. _cpx : https://www.npmjs.com/package/cpx


