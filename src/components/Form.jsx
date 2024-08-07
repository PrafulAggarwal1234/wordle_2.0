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
    <div style={styles.outerContainer}>
        <div style={styles.background}></div>
        <div style={styles.container}>
            <h1 style={styles.title}>Wordle Multiplayer</h1>
            <div style={styles.form}>
                <input 
                    type='text' 
                    placeholder='Enter Your Room Id' 
                    onChange={(e) => setRoomId(e.target.value)} 
                    style={styles.input}
                />
                <input 
                    type='text' 
                    placeholder='Enter Your Name' 
                    onChange={(e) => setUsername(e.target.value)} 
                    style={styles.input}
                />
                <button onClick={joinRoom} style={styles.button}>Join Room</button>
                {loading && <h2 style={styles.loading}>Loading....</h2>}
            </div>
            <div style={styles.instructions}>
                <p>Choose a random integer as the room number and enter your name. Click "Join Room" and ask your friend to join the same room. Once they join, a new real-time Wordle match between you two will start.</p>
            </div>
        </div>
    </div>
  )
}

const styles = {
    outerContainer: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    background: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '90%',
        backgroundImage: 'url("/wordle_background.png")',
        backgroundSize: 'contain', // Change from 'cover' to 'contain'
        backgroundRepeat: 'no-repeat', // Ensure no repetition
        backgroundPosition: 'center',
        transform: 'translate(-50%, -50%) rotate(15deg)',
        opacity: 0.5,
        zIndex: -1,
    },
    container: {
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '1rem',
        color: 'black'
    },
    form: {
        width: '100%',
        marginBottom: '1rem',
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        marginBottom: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1rem'
    },
    button: {
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '1rem',
        cursor: 'pointer'
    },
    buttonHover: {
        backgroundColor: '#45a049'
    },
    loading: {
        marginTop: '1rem',
        fontSize: '1.5rem'
    },
    instructions: {
        fontSize: '1rem',
        color: 'black',
        maxWidth: '400px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        borderRadius: '10px'
    }
};


export default Form