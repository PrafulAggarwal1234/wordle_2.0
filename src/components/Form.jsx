import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Form = ({socket,setPlayer2}) => {
    const [roomId,setRoomId] = useState('');
    const [username,setUsername] = useState('');
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    // const [isavailable,setIsavailable]=useState(false);
    const joinRoom = ()=>{
        socket.emit("userjoined",{roomId,username});
        socket.on("roomfull",(isavailable)=>{
            console.log('cant be');
            if(!isavailable){
                    alert("room is full try another room!")
            }
            else{
                setLoading(true);
            }
        })
        socket.on("player-joined",(msg)=>{
            console.log('player2: ',msg)
            setPlayer2(msg);
            navigate(`/room/${roomId}/${username}`)
        })
    }
  return (
    <div>
        <input type='text' placeholder='Enter Your Room Id' onChange={(e)=>setRoomId(e.target.value)}/>
        <input type='text' placeholder='Enter Your Name' onChange={(e)=>setUsername(e.target.value)}/>
        <button onClick={joinRoom}>Join Room</button>
        {loading && <h2>Loading....</h2>}
    </div>
  )
}

export default Form