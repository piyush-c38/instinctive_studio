'use client'

import { useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2 } from 'lucide-react'

interface Camera {
  id: string
  name: string
  location: string
}

interface Incident {
  id: string
  cameraId: string
  camera: Camera
  type: string
  isStart: boolean
  tsEnd: string | null
  thumbnailUrl: string
  resolved: boolean
  timestamp: string
  createdAt: string
  updatedAt: string
}

interface IncidentPlayerProps {
  incident: Incident | null
  onIncidentSelect: (incident: Incident) => void
}

export default function IncidentPlayer({ incident }: IncidentPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState('03:12:37')

  if (!incident) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-400 text-lg">Select an incident to view</div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Video player area */}
      <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden relative">
        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {formatDate(incident.timestamp)} - {currentTime}
        </div>
        
        {/* Main video display */}
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-6xl font-bold text-white/20">MANDATORY</div>
          </div>
          
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
            <span className="w-2 h-2 bg-red-500 rounded-full inline-block mr-2"></span>
            {incident.camera.name}
          </div>
          
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <div className="w-24 h-16 bg-gray-700 rounded border-2 border-blue-400">
              <div className="w-full h-full bg-gray-600 rounded flex items-center justify-center text-xs text-white">
                Camera - 01
              </div>
            </div>
            <div className="w-24 h-16 bg-gray-700 rounded">
              <div className="w-full h-full bg-gray-600 rounded flex items-center justify-center text-xs text-white">
                Camera - 02
              </div>
            </div>
            <div className="w-24 h-16 bg-gray-700 rounded">
              <div className="w-full h-full bg-gray-600 rounded flex items-center justify-center text-xs text-white">
                Camera - 03
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video controls */}
      <div className="mt-4 bg-gray-800/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            <button className="text-gray-400 hover:text-white p-2">
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button className="text-gray-400 hover:text-white p-2">
              <SkipForward className="w-5 h-5" />
            </button>
            
            <div className="text-white text-sm">
              {currentTime} (05-Jun-2025)
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white p-2">
              <Volume2 className="w-5 h-5" />
            </button>
            
            <button className="text-gray-400 hover:text-white p-2">
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div className="bg-blue-600 h-1 rounded-full" style={{ width: '35%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
