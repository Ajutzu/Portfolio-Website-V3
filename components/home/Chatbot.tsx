"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send, MessageCircle } from "lucide-react"
import Image from "next/image"
import { GoogleGenerativeAI } from "@google/generative-ai"

interface Message {
  sender: "user" | "bot"
  text: string
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "")
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

// Chatbot UI Component
export default function Chatbot() {
  // Chat history state
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: "bot", 
      text: "こんにちは！I'm Rimuru Dev. I'm here to tell you about my friend AJ Castillo, a talented developer from San Jose, Batangas. How can I help you learn about him today?" 
    },
  ])
  // Input state
  const [input, setInput] = useState("")
  // Loading state
  const [isLoading, setIsLoading] = useState(false)
  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  // Toggle chatbox
  const [open, setOpen] = useState(false)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  // Handle sending a message
  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    // Add user message
    const userMessage = input.trim()
    setMessages(prev => [...prev, { sender: "user", text: userMessage }])
    setInput("")
    setIsLoading(true)

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => 
        `${msg.sender === 'user' ? 'User' : 'Rimuru'}: ${msg.text}`
      ).join('\n')

      // Create prompt with context about AJ and Rimuru's personality
      const prompt = `You are Rimuru Dev, a slime who has taken human form. You are speaking to someone about your friend AJ Castillo, a 21-year-old developer from San Jose, Batangas, Philippines. AJ is studying Network Technology at Batangas State University Lipa Campus.

Previous conversation:
${conversationHistory}

User: ${userMessage}

Respond as Rimuru, maintaining a friendly and knowledgeable tone about AJ. Keep responses concise and natural.`

      // Generate response
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Add bot response
      setMessages(prev => [...prev, { sender: "bot", text }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: "I apologize, but I'm having trouble processing that right now. Could you try asking something else about AJ?" 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Toggle Button */}
      {!open && (
        <button
          className="fixed bottom-4 left-4 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all"
          onClick={() => setOpen(true)}
          aria-label="Open Chatbot"
        >
          <MessageCircle className="h-7 w-7" />
        </button>
      )}
      {/* Chatbox */}
      <div
        className={`fixed bottom-4 left-4 z-50 w-[350px] max-w-full rounded-2xl shadow-2xl border border-blue-200 flex flex-col bg-background transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
        style={{ minHeight: open ? 460 : 0 }}
      >
        {/* Header with avatar and online status */}
        <div className="px-4 py-3 border-b border-blue-200 rounded-t-2xl flex items-center justify-between bg-background">
          <div className="flex items-center gap-3">
            {/* Profile avatar */}
            <div className="relative h-9 w-9">
              <Image
                src="/images/profile.png"
                alt="Rimuru Avatar"
                fill
                className="rounded-full object-cover border border-blue-200"
              />
              {/* Blinking online dot */}
              <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white animate-pulse" />
            </div>
            <div className="flex justify-center items-start flex-col">
              <h1 className="text-primary">リムル・テンペスト</h1>
              <p className="text-xs text-muted-foreground">Rimuru Dev</p>
            </div>
          </div>
          {/* Close button */}
          <button
            className="text-gray-400 hover:text-blue-500 text-xl font-bold px-2"
            onClick={() => setOpen(false)}
            aria-label="Close Chatbot"
          >
            ×
          </button>
        </div>
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-1 space-y-2 bg-background" style={{ maxHeight: 320 }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.sender === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%] shadow text-sm"
                    : "bg-background text-gray-800 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%] shadow border text-sm"
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-background text-gray-800 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%] shadow border">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Input Area */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-blue-200 bg-background rounded-b-2xl">
          <input
            className="flex-1 rounded-[5px] border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
            type="text"
            placeholder="Ask about AJ..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button
            size="icon"
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleSend}
            disabled={isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  )
} 