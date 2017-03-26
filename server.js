const PORT = process.env.PORT || 3000;
const express= require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const moment = require("moment");


app.use(express.static(__dirname + "/public"));

io.on("connection", function(socket){
  console.log("User connected via socket.io");
  let now = moment.utc(moment().valueOf()).local().format("h:mm a");

    socket.on("message", function(message){
      console.log("Message recieved: '"+ message.text+"' at "+message.timeStamp);
      io.emit("message", message);
    });

    socket.emit("message",{
      text:"Welcome to the chat app",
      timeStamp:now
    });

});

http.listen(PORT, function(){
  console.log("Server started!");
});
