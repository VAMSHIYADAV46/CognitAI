import "../styles/ChatWindow.css";
import Chat from "./Chat";
import { HashLoader } from "react-spinners";
import MyContext from "../MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { apiFetch } from "../utils/api.js"; // Use the helper for API calls

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const [Loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    if (!prompt) return;

    setLoading(true);
    setNewChat(false); 

    console.log("message:", prompt, "threadId:", currThreadId);

    try {
      const res = await apiFetch("/chat", {
        method: "POST",
        body: JSON.stringify({
          message: prompt,
          threadId: currThreadId,
        }),
      });
      console.log(res);
      setReply(res.reply);
    } catch (err) {
      console.error("Error fetching reply:", err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
    }

    setPrompt("");
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          CognitAI <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i> Settings
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
          </div>
        </div>
      )}

      <HashLoader loading={Loading} color="white" />
      <Chat />

      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          CognitAI can make mistakes. Check important{" "}
          <a
            className="info-link"
            href="https://console.groq.com/docs/models"
            target="_blank"
            rel="noopener noreferrer"
          >
            info <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
