import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app.js";

const server = createServer(app);
// const io = Server(server);

// io





const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`server is running in: http://localhost:${port}/\n`))