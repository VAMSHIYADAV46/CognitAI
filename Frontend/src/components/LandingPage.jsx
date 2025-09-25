import "../styles/LandingPage.css";

const LandingPage = ({ onEnter }) => {
  return (
    <div className="cognitai-app">
      {/* Navigation */}
      <nav className="navbar-home">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">AI</div>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#architecture">Architecture</a>
            <a href="#contact">Contact</a>
            <button className="cta-button" onClick={onEnter}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Next-Generation AI-Powered
              <br />
              <span className="highlight">Cognitive Assistant</span>
            </h1>
            <p className="hero-description">
              CognitAI revolutionizes human-AI interaction with persistent context memory, adaptive intelligence, and
              beautiful UX. Experience meaningful conversations that remember and learn from every interaction.
            </p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={onEnter}>
                Start Free Trial
              </button>
              <button className="secondary-button">View Demo</button>
            </div>
            <div className="hero-features">
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Persistent Context Memory</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>Enterprise-Ready Security</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="ai-brain-icon">🧠</div>
          </div>
        </div>
      </section>

      {/* Problems vs Solutions */}
      <section className="problems-solutions">
        <div className="section-container">
          <div className="problems-side">
            <h2>Still Using Basic AI Assistants?</h2>
            <div className="problem-list">
              <div className="problem-item">
                <span className="x-mark">✗</span>
                <span>Losing conversation context between sessions</span>
              </div>
              <div className="problem-item">
                <span className="x-mark">✗</span>
                <span>Generic responses that don't adapt to your needs</span>
              </div>
              <div className="problem-item">
                <span className="x-mark">✗</span>
                <span>Limited functionality without extensibility</span>
              </div>
              <div className="problem-item">
                <span className="x-mark">✗</span>
                <span>Poor user experience with basic interfaces</span>
              </div>
            </div>
          </div>
          <div className="solutions-side">
            <h2>We Build Intelligent Solutions That Remember</h2>
            <div className="solution-list">
              <div className="solution-item">
                <span className="checkmark">✓</span>
                <span>Context-aware conversations that span multiple sessions</span>
              </div>
              <div className="solution-item">
                <span className="checkmark">✓</span>
                <span>Adaptive intelligence that learns from your interactions</span>
              </div>
              <div className="solution-item">
                <span className="checkmark">✓</span>
                <span>Modular plugin system for unlimited extensibility</span>
              </div>
              <div className="solution-item">
                <span className="checkmark">✓</span>
                <span>Beautiful, responsive interface with dark/light themes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Functionalities */}
      <section className="functionalities" id="features">
        <div className="section-container">
          <div className="section-header">
            <h2>Core Functionalities</h2>
            <p>Advanced AI capabilities designed to enhance your cognitive workflow</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Real-time Chat Interface</h3>
              <p>
                Smooth conversation flow with instant responses and seamless interaction patterns optimized for
                productivity.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Markdown Support</h3>
              <p>
                Rich text formatting with full Markdown rendering for structured, readable conversations and
                documentation.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎭</div>
              <h3>Multiple AI Personas</h3>
              <p>
                Varied conversational styles and specialized AI personalities tailored for different use cases and
                preferences.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>
                Optimized experience across all devices with adaptive layouts that work seamlessly on desktop, tablet,
                and mobile.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌙</div>
              <h3>Dark/Light Mode</h3>
              <p>Comfortable usage with theme switching capabilities designed for extended interaction sessions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧩</div>
              <h3>Plugin System</h3>
              <p>
                Extensible architecture supporting custom plugins and integrations for unlimited functionality
                expansion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="capabilities" id="capabilities">
        <div className="section-container">
          <div className="section-header">
            <h2>Technical Capabilities</h2>
            <p>Enterprise-grade technology stack powering intelligent interactions</p>
          </div>
          <div className="capabilities-grid">
            <div className="capability-card">
              <div className="capability-icon">🧠</div>
              <h3>Context-Aware AI</h3>
              <p>
                Advanced memory systems that understand and remember conversation history across all sessions for
                meaningful continuity.
              </p>
            </div>
            <div className="capability-card">
              <div className="capability-icon">⚡</div>
              <h3>Optimized Performance</h3>
              <p>
                Lightning-fast API calls and response times with intelligent caching and optimization for seamless user
                experience.
              </p>
            </div>
            <div className="capability-card">
              <div className="capability-icon">🔒</div>
              <h3>Secure Sessions</h3>
              <p>
                Enterprise-grade security with robust session management and data protection protocols for user privacy.
              </p>
            </div>
            <div className="capability-card">
              <div className="capability-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>
                Comprehensive usage metrics and insights tracking for understanding interaction patterns and system
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="architecture" id="architecture">
        <div className="section-container">
          <div className="section-header">
            <h2>System Architecture</h2>
            <p>Scalable, modular architecture built for enterprise deployment</p>
          </div>
          <div className="architecture-grid">
            <div className="arch-component">
              <div className="arch-icon">⚛️</div>
              <h3>Frontend Layer</h3>
              <p>
                React.js application with modular UI components, advanced state management, and responsive design
                patterns.
              </p>
            </div>
            <div className="arch-component">
              <div className="arch-icon">🚀</div>
              <h3>Backend Services</h3>
              <p>
                Node.js with Express.js handling API routes, middleware processing, and scalable request management.
              </p>
            </div>
            <div className="arch-component">
              <div className="arch-icon">🤖</div>
              <h3>AI Core Engine</h3>
              <p>
                OpenAI integration with intelligent context management, response generation, and adaptive learning
                systems.
              </p>
            </div>
            <div className="arch-component">
              <div className="arch-icon">🗄️</div>
              <h3>Data Layer</h3>
              <p>
                MongoDB database storing user sessions, chat history, preferences, and analytics with optimized queries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="usp-section">
        <div className="section-container">
          <div className="usp-content">
            <h2>Why Choose CognitAI?</h2>
            <div className="usp-grid">
              <div className="usp-item">
                <h3>🧠 Persistent Context Memory</h3>
                <p>
                  Remembers conversation history across sessions for meaningful, continuous interactions that build over
                  time.
                </p>
              </div>
              <div className="usp-item">
                <h3>🎯 Adaptive Intelligence</h3>
                <p>
                  Learns from user interactions to personalize responses and improve accuracy with every conversation.
                </p>
              </div>
              <div className="usp-item">
                <h3>🔧 Modular & Extensible</h3>
                <p>Supports plugins and custom AI models, allowing unlimited customization for specific use cases.</p>
              </div>
              <div className="usp-item">
                <h3>🏢 Enterprise-Ready</h3>
                <p>Scalable backend with robust error handling, session management, and enterprise-grade security.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to Experience Next-Gen AI?</h2>
            <p>Join thousands of users who have transformed their workflow with CognitAI's intelligent assistance.</p>
            <div className="cta-buttons">
              <button className="cta-primary" onClick={onEnter}>
                Start Free Trial
              </button>
              <button className="cta-secondary">Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>CognitAI</h3>
            <p>Transforming human-AI interaction through intelligent, context-aware cognitive assistance.</p>
          </div>
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li><a href="#chat">Real-time Chat</a></li>
              <li><a href="#memory">Context Memory</a></li>
              <li><a href="#personas">AI Personas</a></li>
              <li><a href="#plugins">Plugin System</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#privacy">Privacy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Get in Touch</h4>
            <p>📧 CognitAI@gmail.com</p>
            <p>📞 123-4567</p>
            <p>📍 Hyderabad</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CognitAI. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
