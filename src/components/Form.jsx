import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Form = ({socket,setPlayer2}) => {
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const [matchType, setMatchType] = useState('friend');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const joinRoom = () => {
        setIsClicked(true);
        socket.emit("userjoined", { roomId, username });
        socket.on("roomfull", (isavailable) => {
            if (!isavailable) {
                alert("Room is full, try another room!");
                setIsClicked(false);
            } else {
                setLoading(true);
            }
        });
        socket.on("player-joined", (msg) => {
            setPlayer2(msg);
            navigate(`/room/${roomId}/${username}`);
        });
    };

    const joinRandomRoom = () => {
        setIsClicked(true);
        socket.emit("randomjoined", { username });
        setLoading(true);
        socket.on("player-joined", (msg) => {
            setPlayer2(msg);
            navigate(`/room/1/${username}`);
        });
    };

    const handleSubmit = () => {
        if (matchType === 'friend') {
            joinRoom();
        } else {
            joinRandomRoom();
        }
    };

    return (
        <div style={styles.outerContainer}>
            <div style={styles.background}></div>
            <div style={styles.container}>
                <h1 style={styles.title}>Wordle Multiplayer</h1>
                <div style={styles.form}>
                    <div style={styles.radioContainer}>
                        <label>
                            <input
                                type="radio"
                                value="friend"
                                checked={matchType === 'friend'}
                                onChange={() => setMatchType('friend')}
                                style={styles.radio}
                            />
                            Play with Friend
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="random"
                                checked={matchType === 'random'}
                                onChange={() => setMatchType('random')}
                                style={styles.radio}
                            />
                            Random Match
                        </label>
                    </div>
                    {matchType === 'friend' && (
                        <input 
                            type='text' 
                            placeholder='Enter Your Room Id' 
                            onChange={(e) => setRoomId(e.target.value)} 
                            style={styles.input}
                        />
                    )}
                    <input 
                        type='text' 
                        placeholder='Enter Your Name' 
                        onChange={(e) => setUsername(e.target.value)} 
                        style={styles.input}
                    />
                    <button disabled={isClicked} onClick={handleSubmit} style={styles.button}>
                        {matchType === 'friend' ? 'Join Room' : 'Random Match'}
                    </button>
                    {loading && <h2 style={styles.loading}>Loading....</h2>}
                </div>
                <div style={styles.instructions}>
                    <p>Choose "Play with Friend" to enter a room number and invite a friend to join the same room.</p>
                    <p>Choose "Random Match" to be assigned a random room and start playing with a random opponent.</p>
                </div>
            </div>
        </div>
    );
};

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
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
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
    radioContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '1rem',
    },
    radio: {
        marginRight: '0.5rem',
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
        cursor: 'pointer',
        marginBottom: '0.5rem', // Added margin between buttons
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

export default Form;
