"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Music, Pause, Play} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio("/music/music.mp3")

    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
      }
    }

    audioRef.current.addEventListener('timeupdate', updateTime)
    audioRef.current.addEventListener('loadedmetadata', () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration)
      }
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener('timeupdate', updateTime)
        audioRef.current = null
      }
    }
  }, [])


  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleStartMusic = () => {
    setShowWelcome(false)
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="fixed top-4 right-4 w-[340px] translate-x-0 translate-y-0 rounded-2xl shadow-2xl border border-blue-200">
          <DialogHeader>
            <DialogTitle>Welcome to My Portfolio!</DialogTitle>
            <DialogDescription>
              Want to play the Tensura opening while browsing?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowWelcome(false)}>
              No, thanks
            </Button>
            <Button onClick={handleStartMusic}>
              Yes, let&apos;s go!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Music Player Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 right-4 z-50 rounded-full"
          >
            <Music className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="fixed top-4 right-4 w-[370px] max-w-full translate-x-0 translate-y-0 rounded-2xl shadow-2xl border border-blue-200 p-0">
         
          <DialogTitle></DialogTitle>
          
          <div className="flex flex-col items-center px-6 py-6">
            {/* Album Art */}
            <div className="relative h-40 w-40 mb-4 rounded-xl overflow-hidden shadow-lg border-4 border-white">
              <Image
                src="/images/music.png"
                alt="Tensura Opening 1"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Song Info */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Tensura Opening 1</h3>
              <p className="text-sm text-gray-500">Takuma Terashima</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full mb-2">
              <Slider
                value={[currentTime]}
                onValueChange={handleProgressChange}
                max={duration}
                step={1}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 my-4">
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full flex items-center justify-center bg-white shadow-md border-2 border-blue-200 hover:bg-blue-100"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-blue-500" />
                ) : (
                  <Play className="h-8 w-8 text-blue-500" />
                )}
              </Button>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 