"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const now = Date.now();
    const lastRedirect = localStorage.getItem("lastRedirectTime");
    const lastTime = lastRedirect ? parseInt(lastRedirect, 10) : 0;

    // Nếu chưa đủ 3 giây kể từ lần redirect cuối
    if (now - lastTime < 3000) {
      window.location.href = "https://phamvandiens1.vercel.app/";
    } else {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            localStorage.setItem("lastRedirectTime", Date.now().toString());
            window.location.href = "https://phamvandiens1.vercel.app/";
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Kết nối đến trang chủ trong {countdown} giây(s)</h1>
    </div>
  );
}
