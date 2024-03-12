const isLocal = window.location.href.includes("localhost");

export const apiUrl = isLocal
  ? "http://localhost:3001"
  : "https://thehomehobby-react-184a.onrender.com";

export const frontUrl = isLocal
  ? "http://localhost:5173"
  : "http://thehomehobby.com.s3-website.us-east-2.amazonaws.com";