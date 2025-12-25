

// Your new Render production URL
const BACKEND_URL = "https://file-transfer-backend-wak9.onrender.com"; 

export const socket = io(BACKEND_URL, {
    autoConnect: false, // Remains false as you connect manually in components
    
    // Forced WebSocket transport is more stable for Render & Cross-network
    transports: ["websocket"], 
    
    // Reliability settings for mobile networks
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
    
    // Ensures the connection doesn't drop during large file relays
    timeout: 60000 
});