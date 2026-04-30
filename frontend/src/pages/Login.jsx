import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&family=Yatra+One&display=swap');

  .ayur-root {
    font-family: 'Tiro Devanagari Hindi', serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  @keyframes ayur-cardIn {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .ayur-card {
    position: relative; z-index: 10;
    background: rgba(248, 244, 232, 0.92);
    backdrop-filter: blur(12px);
    border-radius: 22px;
    padding: 42px 44px 48px;
    width: 380px;
    box-shadow: 0 20px 60px rgba(30,80,30,0.25), 0 2px 8px rgba(255,255,255,0.5) inset;
    border: 1.5px solid rgba(255,255,255,0.7);
    animation: ayur-cardIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .ayur-title {
    font-family: 'Yatra One', cursive;
    color: #2bb5c8;
    font-size: 1.45rem;
    text-align: center;
    margin-bottom: 32px;
    line-height: 1.5;
    letter-spacing: 0.01em;
    text-shadow: 0 1px 3px rgba(0,100,120,0.12);
  }

  .ayur-input-group {
    margin-bottom: 18px;
    position: relative;
  }

  .ayur-input-icon {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    color: #4a9e4a; font-size: 1.05rem; pointer-events: none; z-index: 1;
  }

  .ayur-input {
    width: 100%;
    padding: 13px 16px 13px 44px;
    border: 1.5px solid rgba(180,210,170,0.8);
    border-radius: 10px;
    background: rgba(255,255,255,0.88);
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 1rem;
    color: #1a3a1a;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    box-sizing: border-box;
  }
  .ayur-input::placeholder { color: #8aaa80; font-size: 0.95rem; }
  .ayur-input:focus {
    border-color: #2bb5c8;
    background: rgba(255,255,255,0.97);
    box-shadow: 0 0 0 3px rgba(43,181,200,0.15);
  }

  .ayur-btn {
    width: 100%;
    margin-top: 10px;
    padding: 14px;
    border: none;
    border-radius: 10px;
    font-family: 'Yatra One', cursive;
    font-size: 1.08rem;
    color: #fff;
    letter-spacing: 0.03em;
    cursor: pointer;
    position: relative; overflow: hidden;
    transition: transform 0.15s, box-shadow 0.15s, background 0.2s, opacity 0.2s;
  }
  .ayur-btn-normal {
    background: linear-gradient(135deg, #2bb5c8 0%, #1e9ab0 60%, #178898 100%);
    box-shadow: 0 4px 18px rgba(30,154,176,0.38);
  }
  .ayur-btn-normal:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(30,154,176,0.5);
    background: linear-gradient(135deg, #35c5d8 0%, #25aac0 60%, #1a98a8 100%);
  }
  .ayur-btn-normal:active { transform: translateY(0); }
  .ayur-btn-error { background: linear-gradient(135deg,#e05050,#c03030); box-shadow: 0 4px 18px rgba(200,50,50,0.35); }
  .ayur-btn-success { background: linear-gradient(135deg,#3ac860,#28a048); box-shadow: 0 4px 18px rgba(40,160,72,0.35); }
  .ayur-btn-loading { background: linear-gradient(135deg, #2bb5c8, #1e9ab0); opacity: 0.8; }

  .ayur-divider {
    display: flex; align-items: center; gap: 10px;
    margin: 20px 0 14px;
    color: #4a9e4a; font-size: 0.78rem; opacity: 0.7;
  }
  .ayur-divider::before, .ayur-divider::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(90deg, transparent, #a8d5a2, transparent);
  }

  .ayur-herb-row {
    display: flex; justify-content: center; gap: 12px;
    margin-top: 8px; opacity: 0.5; font-size: 1.4rem;
  }
`;

export default function AyurvedaLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [btnState, setBtnState] = useState("normal"); // normal | loading | error | success
  const [btnText, setBtnText] = useState("लग-इन गर्नुहोस्");

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setBtnState("error");
      setBtnText("कृपया विवरण भर्नुहोस्!");
      setTimeout(() => {
        setBtnState("normal");
        setBtnText("लग-इन गर्नुहोस्");
      }, 1800);
      return;
    }
    setBtnState("loading");
    setBtnText("प्रवेश गर्दै...");
    setTimeout(() => {
      setBtnState("success");
      setBtnText("✓ स्वागत छ!");
    }, 1000);
  };

  const btnClass = `ayur-btn ayur-btn-${btnState}`;

  return (
    <>
      <style>{styles}</style>
      <div className="ayur-root">
        <div className="ayur-card">
          <div className="ayur-title">
            आयुर्वेद रिपोर्टिङ् प्रणालीमा स्वागत छ
          </div>

          <div className="ayur-input-group">
            <span className="ayur-input-icon">👤</span>
            <input
              className="ayur-input"
              type="text"
              placeholder="प्रयोगकर्ता नाम"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="ayur-input-group">
            <span className="ayur-input-icon">🔒</span>
            <input
              className="ayur-input"
              type="password"
              placeholder="पासवर्ड"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button className={btnClass} onClick={handleLogin}>
            {btnText}
          </button>

          <div className="ayur-divider">🌿</div>

          <div className="ayur-herb-row">🌱 🍃 🌿 🌾 🌱</div>
        </div>
      </div>
    </>
  );
}