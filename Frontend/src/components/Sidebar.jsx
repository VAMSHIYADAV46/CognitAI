import "../styles/Sidebar.css";
import { useContext, useEffect } from "react";
import MyContext from "../MyContext.jsx";
import { v4 as uuidv4 } from "uuid";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api"; // dynamic base URL

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
  } = useContext(MyContext);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv4());
    setPrevChats([]);
  };

  const getAllThreads = async () => {
    try {
      const response = await fetch(`${API_BASE}/thread`);
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData);
    } catch (err) {
      console.error("Failed to fetch threads:", err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, []);

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    try {
      const response = await fetch(`${API_BASE}/thread/${newThreadId}`);
      const res = await response.json();
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.error("Failed to fetch thread:", err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(`${API_BASE}/thread/${threadId}`, { method: "DELETE" });
      const res = await response.json();
      setAllThreads((prev) => prev.filter((thread) => thread.threadId !== threadId));
      if (threadId === currThreadId) createNewChat();
    } catch (err) {
      console.error("Failed to delete thread:", err);
    }
  };

  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img src="./src/assets/black brain logo.svg" className="logo" alt="Logo" />
        <span><i className="fa-solid fa-pen-to-square"></i></span>
      </button>

      <ul className="history">
        {allThreads?.map((thread) => (
          <li
            key={thread.threadId}
            onClick={() => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted" : ""}
          >
            {thread.title}
            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div className="signin">
        <p>CognitAI &trade;</p>
      </div>
    </section>
  );
}

export default Sidebar;
