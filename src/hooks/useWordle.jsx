import { useState } from "react"
import axios from "axios";
import Popup from "../components/Popup";

const useWordle = ({solution,socket,player2}) =>{
    const [turn,setTurn]=useState(0); //track which turn is going on
    const [currentGuess,setCurrentGuess]=useState(''); //it will be a string
    const [guesses,setGuesses]=useState([...Array(6)]); //it will be a array of strings and color
    const [history,setHistory]=useState([]); //it will be  containg simple word array
    const [isCorrect,setIsCorrect] = useState(false);
    const [usedKeys,setUsedKeys] = useState({}); //{a: 'green',b:'yellow' etc}
    const [flag,setFlag]=useState(false);

    async function checkWordValidity(word) {
        try {
            const url= `https://www.dictionaryapi.com/api/v3/references/collegiate/json/$${word}?key=a399ccf5-96fd-40b3-83f9-4aad1747ae3f`;
            const response = await axios.get(url);
            // The API response will be an array of definitions if the word is valid
            if(response.data.includes(word)) {
                return true;
            }
            else{ 
                console.log("Invalid Word");
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    //format new guess into array of letter objects
    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((currChar) =>{
            return {key: currChar,color: 'grey'}
        })

        //find any green letters (letter is in the word and at same position)
        formattedGuess.forEach((element,index) => {
            if(solutionArray[index]===element.key){
               element.color='green';
               solutionArray[index]=null; //now set it null to avoid duplication
            }
        })

        //find any yellow letters (letter is in the solution but at some differnt place)
        formattedGuess.forEach((element,index)=>{
            if(element.color!=='green' && solutionArray.includes(element.key)){
                element.color='yellow';
                solutionArray[solutionArray.indexOf(element.key)]=null; //again set it to null to avoid duplicates
            }
        })
        return formattedGuess;
    }

    //add a new guess to guesses state
    const addNewGuess = (formatedGuess) =>{
        let flag_temp=false;
        if(solution===currentGuess) {
            setIsCorrect(true);
            flag_temp=true;
        }
        setGuesses((prev)=>{
            const newGuesses=[...prev];
            newGuesses[turn]=formatedGuess;
            socket.emit('opponents-progress',{to: player2.socket_id, body: {guesses: newGuesses, hasWon: flag_temp}})
            return newGuesses;
        })
        setHistory((prevHistory)=>{
            const newHistory = [...prevHistory,currentGuess];
            return newHistory;
        })
        setTurn(turn+1);
        setUsedKeys((prev)=>{
            let newKeys = {...prev}
            formatedGuess.forEach((l)=>{
                const currentColor = newKeys[l.key];
                if(l.color ==='green'){
                    newKeys[l.key]='green';
                    return;
                }
                if(l.color === 'yellow'&& currentColor!=='green' ){
                    newKeys[l.key]='yellow';
                    return;
                }
                if(!currentColor){
                    newKeys[l.key]='grey';
                    return;
                }
            })
            return newKeys;
        })
        // socket.emit('oppenents-progress',{to: player2.socket_id, guesses: guesses})
        //rest the current guess 
        setCurrentGuess('');
    }

    // handle keyup event & track current guess
    //if user presses enter add the new guess
    const handleKeyup = ({key}) =>{
        console.log("keyup: ,",key);
       if(key==='Backspace'){
        setCurrentGuess((prev)=>{
            return prev.slice(0,-1);
        })
        return;
       }
       if(key==='Enter' && currentGuess.length===5 && turn<6 && !history.includes(currentGuess)){
            checkWordValidity(currentGuess)
            .then(isValid => {
                if (isValid) {
                    setHistory((prev)=>{
                        return [...prev,currentGuess];
                    })
                    const formatted=formatGuess();
                    addNewGuess(formatted);
                    // socket.emit('oppenents-progress',{to: player2.socket_id, guesses: guesses})
                    return;
                } else {
                    setFlag(true);
                }
            })
            .catch(err => {
                console.error(err);
            });
       }
        if(/^[A-Za-z]$/.test(key)){
            key=key.toLowerCase();
            if(currentGuess.length<5){
                setCurrentGuess((prev)=>{
                    return prev+key;
                });
            }
            console.log(currentGuess);
        }
    }
    const handleMouseClick = (key) =>{
        console.log("mouseclick: ,",key);
       if(key==='Backspace'){
        setCurrentGuess((prev)=>{
            return prev.slice(0,-1);
        })
        return;
       }
       if(key==='Enter' && currentGuess.length===5 && turn<6 && !history.includes(currentGuess)){
            checkWordValidity(currentGuess)
            .then(isValid => {
                if (isValid) {
                    setHistory((prev)=>{
                        return [...prev,currentGuess];
                    })
                    const formatted=formatGuess();
                    addNewGuess(formatted);
                    return;
                } else {
                    setFlag(true);
                }
            })
            .catch(err => {
                console.error(err);
            });
       }
        if(/^[A-Za-z]$/.test(key)){
            key=key.toLowerCase();
            if(currentGuess.length<5){
                setCurrentGuess((prev)=>{
                    return prev+key;
                });
            }
            console.log(currentGuess);
        }
    }
    return {turn,currentGuess,guesses,isCorrect,usedKeys,handleKeyup,flag,setCurrentGuess,setFlag,handleMouseClick}
}

export default useWordle;