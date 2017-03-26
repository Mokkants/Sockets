const socket = io();
var name=getQueryVariable("name") || "Anonymous";
var room=getQueryVariable("room");;



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
  if(message.name){
    $message.append("<p><strong>"+message.name+":</strong> "+message.text+"<i> // "+message.timeStamp+"</i></p>");
  }
});


// Handle new message
const $form = jQuery("#message-form");

$form.on("submit", function(event){
  event.preventDefault();
  const $message = $form.find("input[name=message]");
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
