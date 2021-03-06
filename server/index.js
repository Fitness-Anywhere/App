const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
// custom middlewares
const auth = require("./middleware/auth");
const errorMiddleware = require("./middleware/error");

const server = express();
server.use(helmet());
server.use(cors());

// stripe webhook needs to be before express.json()
server.use("/api/webhooks", require("./routes/api/webhooks"));

server.use(express.json());

server.get('/api', (req, res) => res.send('API running'));

// Define routes
server.use("/api/auth/", require("./routes/api/auth"));
server.use("/api/instructors", require("./routes/api/instructors"));
server.use("/api/classes", require("./routes/api/classes"));
server.use("/api/clients", auth, require("./routes/api/clients"));

// DEPLOYMENT - Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static
  server.use(express.static("client/build"));

  server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

server.use(errorMiddleware);

module.exports = server;
