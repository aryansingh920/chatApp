import React,{useState , useEffect} from 'react';
import ScrollTobottom from 'react-scroll-to-bottom';
function Chat ({socket,username,room}){
    // console.log(socket)
    const [currentMessage,setCurrentMessage]=useState("");
    const[messageList,setMessageList]=useState([]);

    const sendMessage = async ()=>{
        // console.log("hi")
        if (currentMessage !== ""){
            const messageData = {
                message: currentMessage,
                username: username,
                room: room,
                time: new Date(Date.now()).getHours() 
                + ":" 
                + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message",messageData)
            setCurrentMessage("")
            setMessageList(list => [...list,messageData])

        }
    }


    useEffect(()=>{ 
        socket.on("receive_message",(data)=>{
            console.log(data)
            setMessageList(list => [...list,data])
        })
    },[socket])
    const date = new Date(Date.now()).getDate()+
    "/"+new Date(Date.now()).getMonth()+"/"+
    new Date(Date.now()).getFullYear();
    const DayArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return(
        <div className="chat-window">
            <p>Room No - {room} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            Username - {username}</p>
           <div className="chat-header">
               <p >
                Chat 
               </p>
               </div> 
           <div className="chat-body">
               <ScrollTobottom className="message-container">
               <p style={{
                     fontSize:"0.75rem",
                     backgroundColor:"rgb(235,235,235)",
                     textAlign:"center",
               }}>{date} - {DayArr[new Date(Date.now()).getDay()]}</p>
               <p style={{
                     fontSize:"0.6rem",
                    //  backgroundColor:"rgb(235,235,235)",
                     textAlign:"center",
               }}>Today</p>
               {messageList.map((content)=>{
                     return(
                         <div className="message"
                         id={username === content.username
                         ? "you" : 
                         "other"}>
                             <div>
                                 <div className="message-content">
                                        <p>{content.message}</p>
                                 </div>
                                 <div className="message-meta">
                                     <p id="time">{content.time}</p>
                                     <p id="author">{content.username}</p>
                                 </div>
                             </div>
                         </div>
                     )
               })}
               </ScrollTobottom>
           </div>
           <div className="chat-footer">
               <input
               value={currentMessage}
               onKeyPress={(event)=>{
                   event.key === "Enter" && sendMessage();
               }}
               type="text"
               placeholder="Hey..."
               onChange={(event)=>{
                   setCurrentMessage(event.target.value);
               }}/>
               <button onClick={sendMessage} variant="contained">&#10148;</button>

               </div> 
        </div>
    )

}

export default Chat