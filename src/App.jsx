import { useEffect, useMemo, useState } from "react";
import {io} from 'socket.io-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Wordle from "./components/Wordle";
import Form from "./components/Form";
function App() {
  const [solution,setSolution] =useState(null);
  const [player2,setPlayer2]=useState({'username':'','socket_id':''});
  const socket= useMemo(() => io("https://wordle-server-ddo7.onrender.com/"), []);
  socket.on("solution-word",(word)=>{
    setSolution(word);
  })
  // console.log(solution);
  return (
    <Router>
    
      {/* Define the routes */}
      <Routes>
        <Route path="/" exact element={<Form socket={socket} setPlayer2={setPlayer2}/>} />
        <Route path="/room/:id/:username" element={<Wordle socket={socket } solution={solution} player2={player2}/>} />
      </Routes>
  </Router>
  );
}

export default App;
