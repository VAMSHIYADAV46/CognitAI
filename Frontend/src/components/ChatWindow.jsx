import "../styles/ChatWindow.css";
import Chat from "./Chat";
import { HashLoader } from "react-spinners";
import MyContext from "../MyContext.jsx";
import { useContext, useState, useEffect, useRef } from "react";
import { apiFetch } from "../utils/api.js"; // Use the helper for API calls
import { MODELS, DEFAULT_MODEL } from "../utils/models.js";

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
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const modelPickerRef = useRef(null);

  const currentModel = MODELS.find((m) => m.id === selectedModel) || MODELS[0];

  const getReply = async () => {
    if (!prompt) return;

    setLoading(true);
    setNewChat(false);

    console.log(
      "message:",
      prompt,
      "threadId:",
      currThreadId,
      "model:",
      selectedModel,
    );

    try {
      const res = await apiFetch("/chat", {
        method: "POST",
        body: JSON.stringify({
          message: prompt,
          threadId: currThreadId,
          model: selectedModel,
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

  // close the model menu when clicking anywhere outside it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        modelPickerRef.current &&
        !modelPickerRef.current.contains(e.target)
      ) {
        setModelMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const handleModelSelect = (id) => {
    setSelectedModel(id);
    setModelMenuOpen(false);
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

          <div className="modelPicker" ref={modelPickerRef}>
            <button
              type="button"
              className="modelBtn"
              onClick={() => setModelMenuOpen((o) => !o)}
            >
              {currentModel.label}{" "}
              <i
                className={`fa-solid ${modelMenuOpen ? "fa-chevron-down" : "fa-chevron-up"}`}
              ></i>
            </button>

            {modelMenuOpen && (
              <div className="modelMenu">
                {MODELS.map((m) => (
                  <div
                    key={m.id}
                    className={`modelOption ${m.id === selectedModel ? "active" : ""}`}
                    onClick={() => handleModelSelect(m.id)}
                  >
                    <div className="modelText">
                      <span className="modelName">{m.label}</span>
                      <span className="modelNote">{m.note}</span>
                    </div>
                    {m.id === selectedModel && (
                      <i className="fa-solid fa-check"></i>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

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
