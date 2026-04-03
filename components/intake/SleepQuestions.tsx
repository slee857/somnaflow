"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface Message {
  from: "ai" | "user";
  text: string;
}

interface SleepQuestionsProps {
  messages: Message[];
  options?: string[];
  onAnswer?: (answer: string) => void;
  isTyping?: boolean;
}

export default function SleepQuestions({
  messages,
  options,
  onAnswer,
  isTyping,
}: SleepQuestionsProps) {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
        >
          {msg.from === "ai" && (
            <div className="w-8 h-8 rounded-full bg-[#4ECDC4]/20 border border-[#4ECDC4]/30 flex items-center justify-center mr-3 mt-1 shrink-0">
              <MessageCircle className="w-4 h-4 text-[#4ECDC4]" />
            </div>
          )}
          <div
            className={`max-w-xs lg:max-w-md px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
              msg.from === "ai"
                ? "bg-[#1A2540] border border-[#2A3550] text-[#CBD5E1] rounded-tl-none"
                : "bg-[#4ECDC4] text-[#0B1120] font-medium rounded-tr-none"
            }`}
          >
            {msg.text}
          </div>
        </motion.div>
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className="w-8 h-8 rounded-full bg-[#4ECDC4]/20 border border-[#4ECDC4]/30 flex items-center justify-center mr-3 shrink-0">
            <MessageCircle className="w-4 h-4 text-[#4ECDC4]" />
          </div>
          <div className="bg-[#1A2540] border border-[#2A3550] px-5 py-3.5 rounded-2xl rounded-tl-none">
            <div className="flex gap-1.5 items-center h-4">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#4ECDC4]"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Answer options */}
      {options && options.length > 0 && !isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 pl-11"
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onAnswer?.(option)}
              className="px-4 py-2 bg-[#1A2540] hover:bg-[#4ECDC4]/10 border border-[#2A3550] hover:border-[#4ECDC4]/40 text-[#CBD5E1] hover:text-[#4ECDC4] text-sm rounded-full transition-all duration-200"
            >
              {option}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
