const socket = io();

socket.on("connect", function(){
  console.log("Connected to socket.io server");
});

socket.on("message", function(message){
  console.log("New message");
  console.log(message.text);

  jQuery(".messages").append("<p>"+message.text+"<i> // "+message.timeStamp+"</i></p>");
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
      text: $message.val(),
      time:now,
      timeStamp:friendlyFormat
    });
  }

  $message.val("");

});
