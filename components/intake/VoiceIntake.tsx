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
        {/* Pulse rings for active state */}
        {isActive && !recording && (
          <>
            <motion.div
              className="absolute w-32 h-32 rounded-full border border-amber-200"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-32 h-32 rounded-full border border-amber-100"
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
            />
          </>
        )}

        {/* Recording rings */}
        {recording && (
          <motion.div
            className="absolute rounded-full bg-red-50 border border-red-200"
            animate={{
              width: [100, 100 + volume * 50, 100],
              height: [100, 100 + volume * 50, 100],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{ duration: 0.15 }}
            style={{ transform: "translate(-50%, -50%)", top: "50%", left: "50%" }}
          />
        )}

        <button
          onClick={handleMicClick}
          className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            recording
              ? "bg-red-500 hover:bg-red-600 text-white"
              : isActive
              ? "bg-[#D97706] hover:bg-[#B45309] text-white animate-pulse-ring"
              : "bg-white border border-gray-200 hover:border-amber-300 hover:bg-amber-50 text-gray-400 hover:text-[#D97706]"
          }`}
        >
          {recording ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </button>
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
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-500 text-sm font-medium">Recording... tap to stop</span>
            </div>
          ) : isActive ? (
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#D97706]" />
                <span className="text-amber-700 text-sm font-medium">Tap mic to answer</span>
              </div>
              <span className="text-gray-400 text-xs">or use the buttons below</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <span className="text-gray-600 text-sm font-medium">Tap to start voice consultation</span>
              <span className="text-gray-400 text-xs">Uses your microphone</span>
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
              className="w-1 bg-red-400 rounded-full"
              animate={{
                height: [4, (i % 3 === 0 ? 20 : i % 2 === 0 ? 16 : 12) + 4, 4],
              }}
              transition={{
                duration: 0.4,
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
