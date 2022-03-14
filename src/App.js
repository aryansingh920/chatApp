import io from 'socket.io-client'
import React,{useState} from 'react'
import Chat from './Chats';
import './App.css';
import {Tooltip} from '@material-ui/core'
// import randomstring from "randomstring"

const socket = io.connect("https://shielded-thicket-82720.herokuapp.com/", { transports: ['websocket', 'polling', 'flashsocket'] });
// const socket = io.connect("http://localhost:3001", { transports: ['websocket', 'polling', 'flashsocket'] });

function App() {
  const [username,setUsername] = useState("");
  const [room,setRoom] = useState("");
  const [showChat,setshowChat] = useState(false);

  const joinRoom = async ()=>{
    if(username !== "" && room !== ""){
      await socket.emit("join_room",room);
      setshowChat(true);
    }
  }
  // console.log(username)
  const pin = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);;
  return (
    <div className="App">

      
      {
      !showChat ?
      (<div className="joinChatContainer">
      <h1>Join A Chat</h1>
      <input 
      type="text" 
      placeholder="Enter Your Name" 
      onChange={
        (event)=>{
          setUsername(event.target.value)
        }
      }
      />
      <Tooltip arrow placement="right" title="Enter a room code">
      <input 
      type="text" 
      placeholder="Room ID..." 
      onChange={
        (event)=>{
          setRoom(event.target.value)
        }
      }
      />
      </Tooltip>
      <code
      style={{
        fontSize:"0.7rem",
        color:"rgb(235,0,0)",
      }}>*Share the above room code to chat</code>
      <button onClick={joinRoom}>Join A Room</button>
      </div>)
      :(
      <Chat 
      socket={socket}
      username={username}
      room={room}
      />)
      }
      <a target="__blank" style={{color:"white"}} href="https://aryansingh920.github.io/AryanSingh">
      <h2 style={{color:"black"}}>Aryan Singh</h2>
      </a>
    </div>
  );
}

export default App;