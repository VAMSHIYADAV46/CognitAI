import { useEffect } from "react";
import "../styles/DemoPage.css";


const DEMO_VIDEO_SRC = "/Cognit demo.mp4";

const HIGHLIGHTS = [
  {
    icon: "🔀",
    title: "Switch models instantly",
    text: "Pick from multiple AI models right inside the chat box and get replies from the one you choose.",
  },
  {
    icon: "📝",
    title: "Markdown and code",
    text: "Answers render with clean formatting, tables and syntax highlighted code blocks.",
  },
  {
    icon: "🗂️",
    title: "Saved conversations",
    text: "Every chat is stored, so you can come back to any thread from the sidebar.",
  },
];

const DemoPage = ({ onBack, onEnter }) => {
  // always open the page from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dp-page">
      {/* Navigation */}
      <nav className="dp-nav">
        <div className="dp-nav-inner">
          <button
            className="dp-logo"
            onClick={onBack}
            aria-label="Back to home"
          >
            <span className="dp-logo-icon">AI</span>
            <span className="dp-logo-text">
              Cognit<span className="dp-logo-accent">AI</span>
            </span>
          </button>
          <div className="dp-nav-actions">
            <button className="dp-btn dp-btn-outline" onClick={onBack}>
              ← Back to Home
            </button>
            <button className="dp-btn dp-btn-primary" onClick={onEnter}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="dp-header">
        <span className="dp-badge">Product Demo</span>
        <h1>
          See <span className="dp-highlight">CognitAI</span> in action
        </h1>
        <p>
          A quick walkthrough of the chat experience, from picking a model to
          getting a formatted answer.
        </p>
      </header>

      {/* Video */}
      <section className="dp-video-section">
        <div className="dp-video-card">
          <video
            className="dp-video"
            src={DEMO_VIDEO_SRC}
            controls
            autoPlay
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Highlights */}
      <section className="dp-highlights">
        {HIGHLIGHTS.map((h) => (
          <div className="dp-card" key={h.title}>
            <div className="dp-card-icon">{h.icon}</div>
            <h3>{h.title}</h3>
            <p>{h.text}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="dp-cta">
        <h2>Ready to try it yourself?</h2>
        <p>Jump into the chat and start a conversation in seconds.</p>
        <div className="dp-cta-buttons">
          <button className="dp-btn dp-btn-primary dp-btn-lg" onClick={onEnter}>
            Start Free Trial
          </button>
          <button className="dp-btn dp-btn-outline dp-btn-lg" onClick={onBack}>
            Back to Home
          </button>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;
