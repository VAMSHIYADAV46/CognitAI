import './App.css';
import ChatWindow from "./components/ChatWindow.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MyContext from "./MyContext.jsx";
import LandingPage from './components/LandingPage.jsx';

import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

function App() {
  const [showLanding, setShowLanding] = useState(true); // Show landing page first
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv4());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  };

  return (
    <div className='app'>
      {showLanding ? (
        <LandingPage onEnter={() => setShowLanding(false)} />
      ) : (
        <MyContext.Provider value={providerValues}>
          <Sidebar />
          <ChatWindow />
        </MyContext.Provider>
      )}
    </div>
  );
}

export default App;
