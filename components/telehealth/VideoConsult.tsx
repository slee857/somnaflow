"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  MessageSquare,
  Monitor,
  MoreHorizontal,
} from "lucide-react";

interface VideoConsultProps {
  doctorName?: string;
  onEnd?: () => void;
}

export default function VideoConsult({
  doctorName = "Dr. Sarah Chen, MD",
  onEnd,
}: VideoConsultProps) {
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const handleStart = () => setCallActive(true);
  const handleEnd = () => {
    setCallActive(false);
    setCallEnded(true);
    onEnd?.();
  };

  if (callEnded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-[#4ECDC4]/20 border border-[#4ECDC4]/30 flex items-center justify-center">
          <Phone className="w-8 h-8 text-[#4ECDC4]" />
        </div>
        <h3 className="text-xl font-bold text-white">Consultation Complete</h3>
        <p className="text-[#94A3B8] text-sm text-center max-w-xs">
          Your prescription has been sent to the pharmacy. Expect delivery within 24 hours.
        </p>
      </motion.div>
    );
  }

  if (!callActive) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-6 py-10"
      >
        <div className="relative w-24 h-24">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4ECDC4]/30 to-[#6B8AFF]/30 border-2 border-[#4ECDC4]/50 flex items-center justify-center text-3xl font-bold text-white">
            SC
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#1A2540]" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">{doctorName}</h3>
          <p className="text-[#94A3B8] text-sm mt-1">Sleep Medicine Specialist — Board Certified</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-green-400 text-xs font-medium">Available now</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
          className="flex items-center gap-3 bg-[#4ECDC4] hover:bg-[#3DBDB4] text-[#0B1120] font-bold px-8 py-4 rounded-full shadow-lg shadow-[#4ECDC4]/30"
        >
          <Video className="w-5 h-5" />
          Join Video Consultation
        </motion.button>
        <p className="text-[#64748B] text-xs">Secure, HIPAA-compliant video call</p>
      </motion.div>
    );
  }

  return (
    <div className="relative bg-[#070E1A] rounded-2xl overflow-hidden aspect-video max-w-2xl mx-auto">
      {/* Doctor video feed (simulated) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1525] to-[#1A2540]">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        {/* Doctor avatar center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#4ECDC4]/30 to-[#6B8AFF]/30 border-2 border-[#4ECDC4]/50 flex items-center justify-center text-4xl font-bold text-white">
              SC
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">{doctorName}</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <motion.span
                  className="w-2 h-2 rounded-full bg-red-500"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-red-400 text-xs font-medium">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Self view PIP */}
      <AnimatePresence>
        {videoOn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 w-24 h-18 sm:w-32 sm:h-24 rounded-xl bg-[#1A2540] border border-[#2A3550] overflow-hidden flex items-center justify-center"
          >
            <div className="text-[#475569] text-2xl font-bold">You</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            className="absolute top-0 right-0 bottom-0 w-64 bg-[#0B1120]/95 backdrop-blur-sm border-l border-[#2A3550] p-4 flex flex-col"
          >
            <p className="text-white text-sm font-semibold mb-3">Chat</p>
            <div className="flex-1 space-y-3 text-xs text-[#94A3B8]">
              <div className="bg-[#1A2540] rounded-lg p-2">
                <span className="text-[#4ECDC4] font-medium">Dr. Chen:</span> Hello! I&apos;ve reviewed your sleep intake summary. Let&apos;s discuss your options.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button
          onClick={() => setMicOn(!micOn)}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
            micOn ? "bg-white/10 hover:bg-white/20" : "bg-[#EF4444] hover:bg-[#DC2626]"
          }`}
        >
          {micOn ? (
            <Mic className="w-5 h-5 text-white" />
          ) : (
            <MicOff className="w-5 h-5 text-white" />
          )}
        </button>
        <button
          onClick={() => setVideoOn(!videoOn)}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
            videoOn ? "bg-white/10 hover:bg-white/20" : "bg-[#EF4444] hover:bg-[#DC2626]"
          }`}
        >
          {videoOn ? (
            <Video className="w-5 h-5 text-white" />
          ) : (
            <VideoOff className="w-5 h-5 text-white" />
          )}
        </button>
        <button
          onClick={handleEnd}
          className="w-12 h-12 rounded-full bg-[#EF4444] hover:bg-[#DC2626] flex items-center justify-center transition-colors"
        >
          <Phone className="w-5 h-5 text-white rotate-[135deg]" />
        </button>
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
            chatOpen ? "bg-[#4ECDC4]/30 border border-[#4ECDC4]/50" : "bg-white/10 hover:bg-white/20"
          }`}
        >
          <MessageSquare className="w-5 h-5 text-white" />
        </button>
        <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <Monitor className="w-5 h-5 text-white" />
        </button>
        <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <MoreHorizontal className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Timer */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
        <motion.span
          className="w-2 h-2 rounded-full bg-red-500"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-white text-xs font-mono">00:03:42</span>
      </div>
    </div>
  );
}
