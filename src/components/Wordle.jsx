import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Model from "./Modal";
import Popup from "./Popup";
import { useNavigate, useParams } from "react-router-dom";

export default function Wordle({socket,solution,player2}){
    const {currentGuess,handleKeyup,guesses,isCorrect,turn,usedKeys,flag,setFlag,handleMouseClick} = useWordle({solution: solution,socket: socket,player2: player2});
    const [showModel,setShowModel] = useState(false);
    const [showPopUp,setShowPopUp]=useState(false);
    const [modelFlag,setModalFlag]=useState(true);
    const {username}=useParams();
    const [opponentGuesses,setOppponentGuesses]=useState([...Array(6)]);
    const [gameOver,setGameOver]=useState(false);
    const navigate = useNavigate();
    let alerted=false;
    // const [player2,setPlayer2] = useState({'username':'','socket_id':''});
    const handleClicktemp = (l) =>{
        console.log("clciked",l);
    }
    useEffect(() => {
        const handleCatchOpponentProgress = (data) => {
            setOppponentGuesses(data.guesses);
            setGameOver(data.hasWon);
            console.log('received data: ', data);
        };

        const handleOpponentDisconnected = (val) => {
            console.log('disconnected opponent!');
            if (val) {
                alert('Your opponent has left the game, you can still continue playing!');
            }
        };

        socket.on("catch-opponent-progress", handleCatchOpponentProgress);
        socket.on("opponent-disconnected", handleOpponentDisconnected);

        // Cleanup on component unmount
        return () => {
            socket.off("catch-opponent-progress", handleCatchOpponentProgress);
            socket.off("opponent-disconnected", handleOpponentDisconnected);
        };
    }, [socket]);
    window.addEventListener('beforeunload', function (event) {
        // Logic to determine whether to redirect, if necessary
        // For example, checking a specific condition:
        // if (someCondition) {
        window.location.href = 'http://localhost:3000/'; // Redirect URL
        // }
      });
      
    useEffect(()=>{
        window.addEventListener('keyup',handleKeyup);

        if(modelFlag && (gameOver || isCorrect)){
            setTimeout(()=> setShowModel(true),2000);
            window.removeEventListener('keyup',handleKeyup);
        }
        if(modelFlag && turn>5){
            setTimeout(()=> setShowModel(true),2000);
            window.removeEventListener('keyup',handleKeyup);
        }
        if(flag){
            setTimeout(()=> setShowPopUp(true),200);
            window.removeEventListener('keyup',handleKeyup);
        }

        return () => window.removeEventListener('keyup',handleKeyup);
    },[handleKeyup,isCorrect,turn,flag,modelFlag]);
    useEffect(()=>{
        if(player2.socket_id===''){
            navigate('/')
        }
    },[player2])
    return(
        <>
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <h2>{player2.username}</h2>
            <h2>{username}</h2>
        </div>
        <div style={{display: "flex", justifyContent: 'space-evenly' }}>
            <Grid guesses={opponentGuesses} flag={false}/>
            <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} flag={true}/>
        </div>
        <Keypad usedKeys={usedKeys} handleClick={handleMouseClick}/>
        {modelFlag && showModel &&<Model won={isCorrect ? 1 : (gameOver ? -1 : 0)} turn={turn} solution={solution} setModalFlag={setModalFlag}/>}
        {showPopUp && <Popup setIsOpen={setShowPopUp} setFlag={setFlag}/>}
        </>
    )
}