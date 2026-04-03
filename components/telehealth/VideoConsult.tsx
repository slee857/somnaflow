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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
          <Phone className="w-8 h-8 text-[#D97706]" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Consultation Complete</h3>
        <p className="text-slate-500 text-sm text-center max-w-xs">
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
        className="flex flex-col items-center gap-6 py-10 bg-white border border-slate-200 rounded-2xl shadow-sm"
      >
        <div className="relative w-24 h-24">
          <div className="w-24 h-24 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-3xl font-bold text-[#D97706]">
            SC
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-900">{doctorName}</h3>
          <p className="text-slate-500 text-sm mt-1">Sleep Medicine Specialist — Board Certified</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-green-600 text-xs font-medium">Available now</span>
          </div>
        </div>
        <button
          onClick={handleStart}
          className="flex items-center gap-3 bg-[#D97706] hover:bg-[#D97706] text-white font-semibold px-8 py-4 rounded-lg shadow-sm transition-colors"
        >
          <Video className="w-5 h-5" />
          Join Video Consultation
        </button>
        <p className="text-slate-400 text-xs">Secure, HIPAA-compliant video call</p>
      </motion.div>
    );
  }

  return (
    <div className="relative bg-slate-800 rounded-2xl overflow-hidden aspect-video max-w-2xl mx-auto shadow-lg">
      {/* Doctor video feed (simulated) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900">
        {/* Doctor avatar center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full bg-amber-900/50 border-2 border-amber-200/50 flex items-center justify-center text-4xl font-bold text-[#D97706]">
              SC
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">{doctorName}</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <motion.span
                  className="w-2 h-2 rounded-full bg-red-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-red-300 text-xs font-medium">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Self view PIP */}
      <AnimatePresence>
        {videoOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 w-24 h-18 sm:w-32 sm:h-24 rounded-xl bg-slate-700 border border-slate-600 overflow-hidden flex items-center justify-center"
          >
            <div className="text-slate-400 text-2xl font-bold">You</div>
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
            className="absolute top-0 right-0 bottom-0 w-64 bg-white/95 backdrop-blur-sm border-l border-slate-200 p-4 flex flex-col"
          >
            <p className="text-slate-900 text-sm font-semibold mb-3">Chat</p>
            <div className="flex-1 space-y-3 text-xs text-slate-600">
              <div className="bg-amber-50 rounded-lg p-2 border border-amber-200">
                <span className="text-[#D97706] font-medium">Dr. Chen:</span> Hello! I&apos;ve reviewed your sleep intake summary. Let&apos;s discuss your options.
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
            micOn ? "bg-white/20 hover:bg-white/30" : "bg-red-500 hover:bg-red-600"
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
            videoOn ? "bg-white/20 hover:bg-white/30" : "bg-red-500 hover:bg-red-600"
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
          className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
        >
          <Phone className="w-5 h-5 text-white rotate-[135deg]" />
        </button>
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
            chatOpen ? "bg-amber-500/80" : "bg-white/20 hover:bg-white/30"
          }`}
        >
          <MessageSquare className="w-5 h-5 text-white" />
        </button>
        <button className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
          <Monitor className="w-5 h-5 text-white" />
        </button>
        <button className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
          <MoreHorizontal className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Timer */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
        <motion.span
          className="w-2 h-2 rounded-full bg-red-400"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-white text-xs font-mono">00:03:42</span>
      </div>
    </div>
  );
}
