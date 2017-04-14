/* eslint-disable */
export function middleWare(req, res, next) {
  res.sseSetup = function() {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream;charset=UTF-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
  }

  res.sseSend = function(data) {
    res.write("data: " + JSON.stringify(data) + "\n\n");
  }

  next()
}

export let middleWareConnections = [];
