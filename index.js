const express = require("express");
const app = express();
const { proxy, scriptUrl } = require("rtsp-relay")(app, server);

const handler = proxy({
  url: `rtsp://admin:Gurudev123@43.229.227.94:554/cam/realmonitor?channel=1&subtype=1`,
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: false,
  additionalFlags: ["-q", "1"],
});

// the endpoint our RTSP uses
app.ws("/api/stream", handler);

// this is an example html page to view the stream
app.get("/", (req, res) =>
  res.send(`
  <canvas id='canvas'></canvas>

  <script src='${scriptUrl}'></script>
  <style>
  #canvas{
    position: absolute;
    width: 100% !important;
    height: 100% !important;
  }
  body{
    margin: 0 !important;
  }
  </style>
  <script>
    loadPlayer({
      url: 'wss://' + location.host + '/api/stream',
      canvas: document.getElementById('canvas')
    });
  </script>
`)
);
const port = 5000;
app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
