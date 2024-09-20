import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

const loadingMessages = [
  "Decoding legal jargon...",
  "Untangling the web of precedents...",
  "Polishing the scales of justice...",
  "Sharpening Occam's razor...",
  "Balancing Lady Justice's scales...",
  "Brewing a pot of legal wisdom...",
  "Navigating the labyrinth of laws...",
  "Consulting the oracle of jurisprudence...",
];

const LoadingState = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);
  const [nextMessage, setNextMessage] = useState(loadingMessages[1]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setCurrentMessage(loadingMessages[messageIndex]);
    setNextMessage(loadingMessages[(messageIndex + 1) % loadingMessages.length]);
  }, [messageIndex]);

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(20)].map((_, index) => (
          <FileText
            key={index}
            className="h-8 w-8 text-gray-200 absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      <div className="z-10 bg-white bg-opacity-80 p-6 rounded-lg shadow-lg text-center">
        <svg className="w-24 h-24 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path className="animate-draw" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline className="animate-draw" points="14 2 14 8 20 8" />
          <line className="animate-draw" x1="16" y1="13" x2="8" y2="13" />
          <line className="animate-draw" x1="16" y1="17" x2="8" y2="17" />
          <polyline className="animate-draw" points="10 9 9 9 8 9" />
        </svg>
        <div className="h-14 relative overflow-hidden">
          <p
            className="text-lg font-medium text-gray-600 absolute w-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateY(${messageIndex % 2 === 0 ? '0' : '-100%'})`,
            }}
          >
            {currentMessage}
          </p>
          <p
            className="text-lg font-medium text-gray-600 absolute w-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateY(${messageIndex % 2 === 0 ? '100%' : '0'})`,
            }}
          >
            {nextMessage}
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Hang tight, legal brilliance takes time!
        </p>
      </div>
    </div>
  );
};

export default LoadingState;