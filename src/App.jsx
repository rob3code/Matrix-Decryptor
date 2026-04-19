import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BACKEND_URL = 'https://tower-game-backend-xi.vercel.app';

export default function DecryptionTool() {
  const [inputHash, setInputHash] = useState('');
  const [status, setStatus] = useState('idle'); // idle, decrypting, success, error
  const [logs, setLogs] = useState([]);
  const [safeGrid, setSafeGrid] = useState(Array(25).fill('unknown'));

  const startDecryption = async () => {
    if (!inputHash) return;
    setStatus('decrypting');
    setLogs(['[SYSTEM] Initializing hash intercept protocol...']);
    
    // The "Mathematical Theatre" Delay
    setTimeout(() => setLogs(l => [...l, `[ANALYTICS] Parsing matrix seed: ${inputHash}...`]), 1000);
    setTimeout(() => setLogs(l => [...l, '[EXPLOIT] Bypassing client-side verification...']), 2000);

    // The actual fetch wrapped in fake delays
    setTimeout(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/predict?hash=${inputHash.trim()}`);
        const data = await res.json();

        if (data.success) {
          setLogs(l => [...l, '[SUCCESS] Matrix decrypted successfully.']);
          setSafeGrid(data.grid);
          setStatus('success');
        } else {
          setLogs(l => [...l, '[ERROR] Hash invalid or expired.']);
          setStatus('error');
        }
      } catch (err) {
        setLogs(l => [...l, '[FATAL] Connection to host severed.']);
        setStatus('error');
      }
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-6 flex flex-col items-center">
      <div className="w-full max-w-lg border border-green-900 bg-gray-900/50 p-6 rounded-md shadow-[0_0_30px_rgba(0,255,0,0.1)]">
        <h1 className="text-2xl font-bold mb-6 text-center tracking-widest text-white">MATRIX DECRYPTOR v2.4</h1>
        
        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Enter Target Round Hash (e.g. CRX-...)" 
            value={inputHash}
            onChange={(e) => setInputHash(e.target.value)}
            disabled={status === 'decrypting'}
            className="w-full bg-black border border-green-800 p-3 text-green-400 outline-none focus:border-green-400 transition-colors uppercase"
          />
        </div>

        <button 
          onClick={startDecryption}
          disabled={status === 'decrypting' || !inputHash}
          className="w-full bg-green-900 hover:bg-green-700 text-white font-bold py-3 disabled:bg-gray-800 transition-colors"
        >
          {status === 'decrypting' ? 'INJECTING EXPLOIT...' : 'INITIATE DECRYPTION'}
        </button>

        {/* Fake Terminal Logs */}
        <div className="mt-6 bg-black p-4 border border-gray-800 h-32 overflow-y-auto text-xs text-gray-400">
          {logs.map((log, i) => <div key={i}>{log}</div>)}
          {status === 'decrypting' && (
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity }} className="mt-2 text-green-500">_</motion.div>
          )}
        </div>

        {/* Decrypted Grid Result */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
              className="mt-8 grid grid-cols-5 gap-2"
            >
              {safeGrid.map((type, i) => (
                <div 
                  key={i} 
                  className={`aspect-square flex items-center justify-center border ${type === 'diamond' ? 'bg-green-900/40 border-green-500 shadow-[0_0_10px_rgba(0,255,0,0.3)] text-xl' : 'bg-gray-900 border-gray-800'}`}
                >
                  {type === 'diamond' ? '💎' : ''}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}