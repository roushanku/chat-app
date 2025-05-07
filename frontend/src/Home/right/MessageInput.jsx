import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Square, X, Loader, Globe } from "lucide-react";
import { useUser } from "../../UserContext";
import { sendMessage } from "../../API/chat.api";
import { toast } from "react-toastify";
import { useSocketContext } from "../../context/socketContext.jsx";
import axios from "axios";
import notificationSound from "../../assets/notification.mp4";

// Language options
const LANGUAGES = [
  { code: "original", name: "Original (No Translation)" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" },
  { code: "ta", name: "Tamil" }
];

const backendUrl = "http://localhost:5000"; // Replace with your backend URL

export default function MessageInput({ chatId }) {
  const { activeUser } = useUser();
  const [message, setMessage] = useState("");
  const { socket } = useSocketContext();
  const audioRef = useRef(null);
  
  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Language selection states
  const [targetLanguage, setTargetLanguage] = useState("original");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const userId = storedUser?.data?.user?._id;
  const token = sessionStorage.getItem("token");

  // Create audio element when component mounts
  useEffect(() => {
    audioRef.current = new Audio(notificationSound);
    audioRef.current.preload = "auto";
    
    // Clean up when component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      stopRecording();
    };
  }, []);

  // Function to play notification sound
  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error("Error playing notification sound:", error);
      });
    }
  };

  // Format recording time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Start voice recording
  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      mediaRecorder.start(200);
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Could not access microphone. Check permissions.");
    }
  };

  // Stop voice recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Cancel recording
  const cancelRecording = () => {
    stopRecording();
    setAudioBlob(null);
    setRecordingTime(0);
  };

  // Translate text function
  const translateText = async (text, targetLang) => {
    if (!text || targetLang === "original") return text;
    
    try {
      const response = await axios.post('http://localhost:5000/api/v1/llm/translate', {
        text: text,
        targetLanguage: targetLang
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        return response.data.data.translatedText;
      }
      throw new Error("Translation failed");
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Translation failed");
      return text;
    }
  };

  // Send voice message with optional translation
  const sendVoiceMessage = async () => {
    if (!audioBlob) return;
    
    try {
      setIsProcessingAudio(true);
      toast.info("Processing audio...");
      
      // Create form data for the audio file
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio-message.webm');
      formData.append('keepFile', 'true');
      formData.append('duration', recordingTime.toString());
      
      // Add language parameter if translation is requested
      if (targetLanguage !== "original") {
        formData.append('targetLanguage', targetLanguage);
      }
      
      // Send to backend for transcription and optional translation
      const response = await axios.post('/api/audio/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        // Get audio URL and transcription
        const audioUrl = response.data.data.audioUrl;
        let transcription = response.data.data.transcription;
        let translatedTranscription = null;
        
        // Translate transcription if needed
        if (targetLanguage !== "original" && transcription) {
          toast.info(`Translating to ${targetLanguage}...`);
          translatedTranscription = await translateText(transcription, targetLanguage);
        }
        
        // Determine message type based on translation
        const messageType = targetLanguage !== "original" ? "translated_audio" : "audio";
        
        // Send the voice message
        const sentMessageResponse = await sendMessage(
          chatId, 
          userId, 
          audioUrl,  // URL to audio file
          messageType,  // Message type
          translatedTranscription || transcription, // Transcription (translated if available)
          recordingTime,
          targetLanguage !== "original" ? targetLanguage : null, // Language code
          targetLanguage !== "original" ? transcription : null // Original transcription if translated
        );
        
        if (sentMessageResponse.status === 201) {
          // Create message object for socket
          const audioMessage = {
            _id: sentMessageResponse.data._id,
            content: audioUrl,
            text_content: translatedTranscription || transcription,
            original_content: targetLanguage !== "original" ? transcription : null,
            sender_id: userId,
            chat_id: chatId,
            type: messageType,
            duration: recordingTime,
            language: targetLanguage !== "original" ? targetLanguage : null,
            createdAt: new Date().toISOString()
          };
          
          // Emit via socket
          if (socket) {
            socket.emit('sendMessage', {
              chatId,
              message: audioMessage
            });
          }
          
          playNotificationSound();
        } else {
          toast.error("Voice message not sent");
        }
        
        // Reset recording state
        setAudioBlob(null);
        setRecordingTime(0);
      } else {
        throw new Error(response.data.message || "Failed to process audio");
      }
    } catch (error) {
      console.error("Error sending voice message:", error);
      toast.error("Failed to send voice message");
    } finally {
      setIsProcessingAudio(false);
    }
  };

  // Handle text message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // Store original message
      const originalMessage = message.trim();
      
      // Reset input immediately for better UX
      setMessage("");
      
      // Determine if translation is needed
      let finalMessage = originalMessage;
      let messageType = "text";
      
      if (targetLanguage !== "original") {
        toast.info(`Translating to ${targetLanguage}...`);
        finalMessage = await translateText(originalMessage, targetLanguage);
        messageType = "text";
      }
      
      // Send message with translation data if needed
      const sentMessageResponse = await sendMessage(
        chatId, 
        userId, 
        finalMessage, 
        messageType, 
      );
      
      if (sentMessageResponse.status === 201) {
        // Create message object for socket
        const newMessage = {
          _id: sentMessageResponse.data._id,
          content: finalMessage,
          sender_id: userId,
          chat_id: chatId,
          type: messageType,
          createdAt: new Date().toISOString()
        };

        // Emit message via socket
        if (socket) {
          socket.emit('sendMessage', {
            chatId,
            message: newMessage
          });
        }
        
        playNotificationSound();
      } else {
        toast.error("Message not sent");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  // Get language name from code
  const getLanguageName = (code) => {
    return LANGUAGES.find(lang => lang.code === code)?.name || code;
  };

  return (
    <div className="p-3 border-t">
      {/* Audio recording interface */}
      {isRecording || audioBlob ? (
        <div className="flex items-center mb-2 p-2 bg-gray-50 rounded-lg">
          {isRecording ? (
            <div className="flex items-center space-x-2 text-red-500">
              <div className="animate-pulse w-3 h-3 rounded-full bg-red-500"></div>
              <span className="font-medium">Recording: {formatTime(recordingTime)}</span>
              <button 
                onClick={stopRecording} 
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                type="button"
              >
                <Square size={16} />
              </button>
              <button 
                onClick={cancelRecording} 
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                type="button"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-sm text-gray-500">
                Audio: {formatTime(recordingTime)}
              </span>
              <div className="flex space-x-2">
                <button 
                  onClick={sendVoiceMessage} 
                  disabled={isProcessingAudio} 
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                  type="button"
                >
                  {isProcessingAudio ? (
                    <Loader className="animate-spin h-4 w-4" />
                  ) : (
                    `Send ${targetLanguage !== "original" ? `(${getLanguageName(targetLanguage)})` : ""}`
                  )}
                </button>
                <button 
                  onClick={cancelRecording} 
                  disabled={isProcessingAudio} 
                  className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
      
      {/* Text message form */}
      <form onSubmit={handleSubmit} className="flex items-center">
        {/* Language selector */}
        <div className="relative mr-2">
          <button 
            type="button"
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full"
          >
            <Globe size={20} />
            {targetLanguage !== "original" && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>
          
          {languageDropdownOpen && (
            <div className="absolute bottom-full mb-2 left-0 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b">
                  Select language:
                </div>
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    type="button"
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      targetLanguage === lang.code ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setTargetLanguage(lang.code);
                      setLanguageDropdownOpen(false);
                    }}
                  >
                    {lang.name}
                    {targetLanguage === lang.code && (
                      <span className="float-right">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Text input */}
        <input 
          type="text" 
          className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={targetLanguage !== "original" 
            ? `Type to send in ${getLanguageName(targetLanguage)}...` 
            : "Type a message..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isRecording || Boolean(audioBlob) || isProcessingAudio}
        />
        
        {/* Voice recording button */}
        {(!isRecording && !audioBlob) ? (
          <button 
            type="button"
            className="ml-2 p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full"
            onClick={startRecording}
            disabled={isProcessingAudio}
          >
            <Mic size={20} />
            <span className="sr-only">Record audio</span>
          </button>
        ) : null}
        
        {/* Send button */}
        <button 
          type="submit"
          className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          disabled={!message.trim() || isRecording || Boolean(audioBlob) || isProcessingAudio}
        >
          <Send size={20} />
        </button>
      </form>
      
      {/* Language indicator */}
      {targetLanguage !== "original" && (
        <div className="mt-1 text-xs text-gray-500 flex items-center">
          <Globe size={12} className="mr-1" />
          Messages will be sent in {getLanguageName(targetLanguage)}
          <button 
            type="button"
            onClick={() => setTargetLanguage("original")}
            className="ml-2 text-blue-500 hover:underline"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}