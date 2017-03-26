const socket = io();
var name=getQueryVariable("name").trim() || "Anonymous";
var room=getQueryVariable("room");



socket.on("connect", function(){
  let now = moment.utc(moment().valueOf()).local().format("h:mm a");
  setTimeout(function(){
      jQuery(".messages").append("<p>"+name+" joined "+room+"<i> // "+now+"</i></p>");
  },50);

});

socket.on("sysMessage",function(message){
  let $message = jQuery(".messages");
  $message.append("<p><strong>"+message.text+"</i></strong></p>");
});

socket.on("message", function(message){
  console.log("New message");
  console.log(message.text);
  console.log(name);
  let $message = jQuery(".messages");
  if(message.timeStamp){
    $message.append("<p><strong>"+message.name+":</strong> "+message.text+"<i> // "+message.timeStamp+"</i></p>");
  }else {
    $message.append("<p><strong>"+message.name+":</strong> "+message.text+"</p>");
  }
});


// Handle new message
const $chatForm = jQuery("#message-form");

$chatForm.on("submit", function(event){
  event.preventDefault();
  const $message = $chatForm.find("input[name=message]");
  let now = moment.utc(moment().valueOf());
  let friendlyFormat = now.local().format("h:mm a");

  if($message.val().trim().length>0){
    socket.emit("message",{
      name:name,
      text: $message.val(),
      time:now,
      timeStamp:friendlyFormat
    });
  }

  $message.val("");

});

const $nameForm = $("#name-form");

$nameForm.on("submit",function(event){
  event.preventDefault();

  let newName = $nameForm.find("input[name=name]").val().trim() || "Anonymous";
  socket.emit("message",{
    name:name,
    text: "has changed their name to <strong>"+newName+"</strong>"
  });
  name=newName;
})
