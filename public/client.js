const ws = new WebSocket("ws://localhost:8000");
const $input = document.getElementById('input');
const $submit = document.getElementById('submit');
const $messages = document.getElementById('messages');

ws.onopen = function(evt) { 

  console.log("Connection open ..."); 
  let info = 'Connection opened.';
  createMessage(info,true);
  ws.send("Remote User Connected.");
};

ws.onmessage = function(evt) {
  createMessage(evt.data)
  console.log(evt);
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};       

$submit.addEventListener('click', function(){
	let msg = $input.value;
	if(msg.length){
		ws.send(msg);
		$input.value = "";
		createMessage(msg,true)
	} 
})

function createMessage(msg,isLocalUser) {
	let line = document.createElement("li");
	line.innerHTML = (isLocalUser)? 'Local: ' + msg :'Remote: ' + msg;
	$messages.appendChild(line);
}