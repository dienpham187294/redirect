"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const now = Date.now();
    const lastRedirect = localStorage.getItem("lastRedirectTime");
    const lastTime = lastRedirect ? parseInt(lastRedirect, 10) : 0;

    // Lấy path và query hiện tại
    const path = window.location.pathname.replace(/^\/phamvandien/, "");
    const search = window.location.search;
    const fullPath = path + search;

    const redirectTo = `https://phamvandiens1.vercel.app${fullPath}`;

    if (now - lastTime < 3000) {
      window.location.href = redirectTo;
    } else {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            localStorage.setItem("lastRedirectTime", Date.now().toString());
            window.location.href = redirectTo;
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
