"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2 } from "lucide-react";

interface VoiceIntakeProps {
  onActivate: () => void;
  isActive: boolean;
}

export default function VoiceIntake({ onActivate, isActive }: VoiceIntakeProps) {
  const [recording, setRecording] = useState(false);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (!recording) return;
    const interval = setInterval(() => {
      setVolume(Math.random() * 0.8 + 0.2);
    }, 150);
    return () => clearInterval(interval);
  }, [recording]);

  const handleMicClick = () => {
    if (!isActive) {
      onActivate();
      return;
    }
    setRecording(!recording);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main mic button */}
      <div className="relative flex items-center justify-center">
        {/* Pulse rings */}
        {(isActive && !recording) && (
          <>
            <motion.div
              className="absolute w-32 h-32 rounded-full border border-[#4ECDC4]/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-32 h-32 rounded-full border border-[#4ECDC4]/15"
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
            />
          </>
        )}

        {/* Recording rings */}
        {recording && (
          <>
            <motion.div
              className="absolute rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30"
              animate={{
                width: [100, 100 + volume * 60, 100],
                height: [100, 100 + volume * 60, 100],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{ duration: 0.15 }}
              style={{ transform: "translate(-50%, -50%)", top: "50%", left: "50%" }}
            />
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={handleMicClick}
          className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
            recording
              ? "bg-[#EF4444] shadow-[#EF4444]/40"
              : isActive
              ? "bg-[#4ECDC4] shadow-[#4ECDC4]/40 animate-pulse-ring"
              : "bg-[#1A2540] border border-[#2A3550] hover:border-[#4ECDC4]/50"
          }`}
        >
          {recording ? (
            <MicOff className={`w-8 h-8 ${recording ? "text-white" : "text-[#94A3B8]"}`} />
          ) : (
            <Mic className={`w-8 h-8 ${isActive ? "text-[#0B1120]" : "text-[#94A3B8]"}`} />
          )}
        </motion.button>
      </div>

      {/* Status text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={recording ? "recording" : isActive ? "active" : "idle"}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-center"
        >
          {recording ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
              <span className="text-[#EF4444] text-sm font-medium">Recording... tap to stop</span>
            </div>
          ) : isActive ? (
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#4ECDC4]" />
                <span className="text-[#4ECDC4] text-sm font-medium">Tap mic to answer</span>
              </div>
              <span className="text-[#64748B] text-xs">or use the buttons below</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <span className="text-[#94A3B8] text-sm font-medium">Tap to start voice consultation</span>
              <span className="text-[#64748B] text-xs">Uses your microphone</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Volume visualizer */}
      {recording && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1 h-8"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#EF4444] rounded-full"
              animate={{
                height: [4, Math.random() * 28 + 4, 4],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
