import "../styles/Chat.css";
import React, { useContext, useState, useEffect } from "react";
import MyContext from "../MyContext";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);

  const [latestReply, setLatestReply] = useState(null);

  // Character-based streaming
  useEffect(() => {
    if (reply === null || reply === undefined) {
      setLatestReply(null);
      return;
    }

    let idx = 0;
    const chunkSize = 5;

    setLatestReply("");

    const interval = setInterval(() => {
      idx += chunkSize;

      setLatestReply(reply.slice(0, idx));

      if (idx >= reply.length) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [reply]);

  // Common Markdown renderer
  const renderMarkdown = (content) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
      >
        {content || ""}
      </ReactMarkdown>
    );
  };

  return (
    <>
      {newChat && <h1>Let's Chat! What's up today?</h1>}

      <div className="chats">
        {/* Previous messages */}
        {prevChats?.slice(0, -1).map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "gptDiv"}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              renderMarkdown(chat.content)
            )}
          </div>
        ))}

        {/* Latest message */}
        {prevChats?.length > 0 && (
          <div className="gptDiv" key="latest-reply">
            {renderMarkdown(
              latestReply === null
                ? prevChats[prevChats.length - 1].content
                : latestReply,
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
