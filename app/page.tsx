"use client";

import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/reminder")
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <div>
      <h1>Spendaily</h1>
    </div>
  );
}