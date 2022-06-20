require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const http = require(`http`);
const {Server} = require("socket.io");
const cookieParser = require("cookie-parser");

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"

}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
})

server.listen(3001, () => {
    console.log("Server Running")
})

//configuring the server to accept and update cookies,
//and it helps us decode the content of said cookies
app.use(cookieParser());

require("./config/mongoose.config");

require("./routes/user.routes")(app);

app.listen(process.env.MY_PORT, () => console.log(`You're connected to port ${process.env.MY_PORT}`))