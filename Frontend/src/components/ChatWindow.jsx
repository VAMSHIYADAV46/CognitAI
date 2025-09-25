import "../styles/ChatWindow.css"
import Chat from "./Chat";
import {SyncLoader,HashLoader} from "react-spinners";

import  MyContext  from "../MyContext.jsx";
import { useContext, useState, useEffect } from "react";




function ChatWindow(){

     const {prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat} = useContext(MyContext);
     const [Loading,setLoading] = useState(false)
     const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {

        setLoading(true); // for starting loading
        setNewChat(false); // for removing of (Let’s Chat! What’s up today?) in new chat after entering prompt
        console.log("message ", prompt, " threadId ", currThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    }


        useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }
    
    return(
        <div className="chatWindow">
            <div className="navbar">
                <span>CognitAI <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>

            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }
            
            {/* <SyncLoader loading={Loading} color="white" ></SyncLoader> */}
            <HashLoader loading={Loading} color="white" ></HashLoader>
            <Chat></Chat>
            
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter'? getReply() : ''} ></input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    CognitAI can make mistakes. Check important <a className="info-link" href="https://console.groq.com/docs/models">info <i className="fa-solid fa-arrow-up-right-from-square"></i></a>.
                </p>
            </div>
            {/* ChatWindow */}
        </div>
    )
}


export default ChatWindow;