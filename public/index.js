const socket  = io('http://localhost:3000')
const send    = document.getElementById('send-container');
const input   = document.getElementById('input-message');
const button  = document.getElementById('button');
const chat    = document.getElementById('chat');
const message = document.getElementById('messages');
let name = "";
name = prompt("Enter your name","");


if(name!="")
{
  socket.emit('new-user',name);
  newUser("You joined chat room.");
}
socket.on('user-name',(data)=>{
  newUser(data+"! Joined chat room.");
})
function newUser(name)
{
  const ele = document.createElement('p');
  ele.setAttribute('class','notification');
  ele.innerHTML =name;
  chat.appendChild(ele);
}


socket.on('private-message',(data)=>{
  messageReceived(data);
})
function messageReceived(data)
{
  const mess = document.createElement('li');
  mess.setAttribute('class','li-message');
  const divMess = document.createElement('div');
  if(data.name == "You")
  {
    divMess.setAttribute('class','message you');
    divMess.innerHTML = data.message;
  }
  else{
    divMess.setAttribute('class','message user');
    divMess.innerHTML = data.name+" : "+data.message;
  }
  message.appendChild(mess);
  mess.appendChild(divMess);
}

button.addEventListener('click',(event)=>{
  event.preventDefault();
  const message = input.value;
  if(message!=""){
    socket.emit('send-message',message);
    messageReceived({message:message,name:"You"});
    input.value = "";
  }
});
