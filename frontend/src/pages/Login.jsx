import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AyurvedaLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [btnState, setBtnState] = useState("normal");
  const [btnText, setBtnText] = useState("लग-इन गर्नुहोस्");

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:wght@400;700&family=Yatra+One&display=swap');

    *{
      margin:0;
      padding:0;
      box-sizing:border-box;
    }

    body{
      font-family:'Tiro Devanagari Hindi', serif;
    }

    .login-page{
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
      position:relative;
      overflow:hidden;

      background-image:
        linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),
        url('/ayurveda1.webp');

      background-size:cover;
      background-position:center;
      background-repeat:no-repeat;
    }

    .login-page::before{
      content:"";
      position:absolute;
      inset:0;
      backdrop-filter: blur(6px);
    }

    .login-card{
      position:relative;
      z-index:2;
      width:100%;
      max-width:420px;
      padding:40px 34px;
      border-radius:24px;
      background:rgba(255,255,255,0.15);
      border:1px solid rgba(255,255,255,0.25);
      box-shadow:0 20px 60px rgba(0,0,0,0.25);
      backdrop-filter: blur(16px);
      animation:fadeUp .6s ease;
    }

    @keyframes fadeUp{
      from{
        opacity:0;
        transform:translateY(30px);
      }
      to{
        opacity:1;
        transform:translateY(0);
      }
    }

    .logo{
      width:72px;
      height:72px;
      border-radius:50%;
      margin:0 auto 16px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:32px;
      background:rgba(255,255,255,0.18);
      border:1px solid rgba(255,255,255,0.2);
    }

    .title{
      font-family:'Yatra One', cursive;
      color:#ffffff;
      font-size:28px;
      text-align:center;
      margin-bottom:8px;
      line-height:1.4;
    }

    .subtitle{
      text-align:center;
      color:rgba(255,255,255,0.82);
      font-size:14px;
      margin-bottom:28px;
    }

    .field{
      margin-bottom:18px;
      position:relative;
    }

    .field input{
      width:100%;
      height:54px;
      border:none;
      outline:none;
      border-radius:14px;
      padding:0 18px 0 48px;
      font-size:15px;
      color:#1f2937;
      background:rgba(255,255,255,0.95);
      box-shadow:0 6px 20px rgba(0,0,0,0.08);
    }

    .field input:focus{
      box-shadow:0 0 0 3px rgba(34,197,94,0.25);
    }

    .icon{
      position:absolute;
      top:50%;
      left:16px;
      transform:translateY(-50%);
      font-size:18px;
    }

    .login-btn{
      width:100%;
      height:54px;
      border:none;
      outline:none;
      border-radius:14px;
      margin-top:6px;
      cursor:pointer;
      font-size:17px;
      font-family:'Yatra One', cursive;
      color:#fff;
      transition:.25s ease;
      background:linear-gradient(135deg,#16a34a,#22c55e);
      box-shadow:0 12px 25px rgba(34,197,94,0.35);
    }

    .login-btn:hover{
      transform:translateY(-2px);
    }

    .login-btn.loading{
      background:linear-gradient(135deg,#0ea5e9,#0284c7);
    }

    .login-btn.error{
      background:linear-gradient(135deg,#ef4444,#dc2626);
    }

    .login-btn.success{
      background:linear-gradient(135deg,#16a34a,#15803d);
    }

    .footer{
      text-align:center;
      margin-top:18px;
      color:rgba(255,255,255,0.7);
      font-size:13px;
    }

    .plants{
      margin-top:14px;
      text-align:center;
      font-size:20px;
      letter-spacing:8px;
    }

    @media(max-width:500px){
      .login-card{
        padding:30px 22px;
      }

      .title{
        font-size:23px;
      }
    }
  `;

  const resetBtn = () => {
    setTimeout(() => {
      setBtnState("normal");
      setBtnText("लग-इन गर्नुहोस्");
    }, 1600);
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setBtnState("error");
      setBtnText("सबै विवरण भर्नुहोस्");
      resetBtn();
      return;
    }

    try {
      setBtnState("loading");
      setBtnText("प्रवेश हुँदैछ...");

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setBtnState("error");
        setBtnText(data.message || "लग-इन असफल");
        resetBtn();
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setBtnState("success");
      setBtnText("✓ स्वागत छ");

      setTimeout(() => {
        navigate("/dashboard");
      }, 900);

    } catch (error) {
      setBtnState("error");
      setBtnText("Server Error");
      resetBtn();
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="login-page">
        <div className="login-card">
          <div className="logo">🌿</div>

          <h1 className="title">
            आयुर्वेद रिपोर्टिङ् प्रणाली
          </h1>

          <p className="subtitle">
            सुरक्षित रूपमा प्रणालीमा प्रवेश गर्नुहोस्
          </p>

          <div className="field">
            <span className="icon">👤</span>
            <input
              type="text"
              placeholder="प्रयोगकर्ता नाम"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="field">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="पासवर्ड"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button
            className={`login-btn ${btnState}`}
            onClick={handleLogin}
          >
            {btnText}
          </button>

          <div className="plants">
            🌱 🌿 🍃 🌾
          </div>

          <div className="footer">
            © Ayurveda Management System
          </div>
        </div>
      </div>
    </>
  );
}