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
import { Music, Pause, Play, Volume2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [showWelcome, setShowWelcome] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio("/music/music.mp3")
    audioRef.current.volume = volume / 100

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

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

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const handleStartMusic = () => {
    setShowWelcome(false)
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="fixed top-4 right-4 w-[300px] translate-x-0 translate-y-0">
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
              Yes, let's go!
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
            className="fixed top-4 right-4 z-50 rounded-full"
          >
            <Music className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="fixed top-4 right-4 w-[300px] translate-x-0 translate-y-0">
          <DialogHeader>
            <DialogTitle asChild><h2 className="text-primary">Music Player</h2></DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Volume2 className="h-5 w-5" />
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 