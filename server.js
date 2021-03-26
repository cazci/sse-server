// TODO: Check port availability
const PORT = 8080;

// TODO: Set interval
const INTERVAL = 1000;

const express = require('express');
const app = express();

app.get('/sse', (req, res) => {
  console.log("Response stream started")

  res.status(200).set({
    "connection": "keep-alive",
    "cache-control": "no-cache",
    "content-type": "application/json"
  })

  // Responses count
  let count = 5;

  const responseStream = setInterval(() => {
    const data = { "timestamp": Date.now().toString() };

    if (count) {
      res.write(JSON.stringify(data))
      console.log("Response sent", JSON.stringify(data))
      count--;
    } else {
      res.end(JSON.stringify(data));
      console.log("Response stream ended", JSON.stringify(data))
      clearInterval(responseStream);
    }
  }, INTERVAL);
});


app.listen(PORT, () => console.log('SSE server is listening on port ' + PORT));