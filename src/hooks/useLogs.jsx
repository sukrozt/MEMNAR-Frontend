import { useState, useEffect } from "react";

export function useLogs() {
  // Başlangıçta LocalStorage'dan logları çekmeye çalışıyoruz
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem("memnarLogs");
    if (savedLogs) {
      try {
        return JSON.parse(savedLogs);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Loglar her değiştiğinde otomatik olarak LocalStorage'ı güncelliyoruz
  useEffect(() => {
    localStorage.setItem("memnarLogs", JSON.stringify(logs));
  }, [logs]);

  const addLog = (message) => setLogs((prev) => [...prev, message]);
  const clearLogs = () => setLogs([]);

  return { logs, addLog, clearLogs };
}