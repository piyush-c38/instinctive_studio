'use client'

import { useState, useRef } from 'react'

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
  tsStart: string
  tsEnd: string | null
  thumbnailUrl: string
  resolved: boolean
  createdAt: string
  updatedAt: string
}

interface IncidentPlayerProps {
  incident: Incident | null
  onIncidentSelect: (incident: Incident) => void
  incidents: Incident[]
}

export default function IncidentPlayer({ incident, onIncidentSelect, incidents }: IncidentPlayerProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDragging, setIsDragging] = useState(false)
  const timelineRef = useRef<SVGSVGElement>(null)
  const scrubberRef = useRef<SVGCircleElement>(null)

  const today = new Date()
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

  const todaysIncidents = (incidents || []).filter(inc => {
    const incidentTime = new Date(inc.tsStart)
    return incidentTime >= startOfDay && incidentTime < endOfDay
  })

  const timeToPosition = (time: Date) => {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const totalMinutes = hours * 60 + minutes + seconds / 60
    return (totalMinutes / (24 * 60)) * 100
  }

  const positionToTime = (position: number) => {
    const totalMinutes = (position / 100) * 24 * 60
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.floor(totalMinutes % 60)
    const seconds = Math.floor((totalMinutes % 1) * 60)
    
    const newTime = new Date(today)
    newTime.setHours(hours, minutes, seconds, 0)
    return newTime
  }

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDragging(true)
    updateTimeFromMouse(e)
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging) {
      updateTimeFromMouse(e)
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      snapToNearestIncident()
    }
  }

  const updateTimeFromMouse = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!timelineRef.current) return
    
    const rect = timelineRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const position = (x / rect.width) * 100
    const clampedPosition = Math.max(0, Math.min(100, position))
    
    setCurrentTime(positionToTime(clampedPosition))
  }

  const snapToNearestIncident = () => {
    if (todaysIncidents.length === 0) return

    const currentPosition = timeToPosition(currentTime)
    let nearestIncident = todaysIncidents[0]
    let minDistance = Math.abs(timeToPosition(new Date(todaysIncidents[0].tsStart)) - currentPosition)

    todaysIncidents.forEach(inc => {
      const incidentPosition = timeToPosition(new Date(inc.tsStart))
      const distance = Math.abs(incidentPosition - currentPosition)
      if (distance < minDistance) {
        minDistance = distance
        nearestIncident = inc
      }
    })

    if (minDistance < 2) {
      setCurrentTime(new Date(nearestIncident.tsStart))
      onIncidentSelect(nearestIncident)
    }
  }

  const handleIncidentClick = (inc: Incident) => {
    setCurrentTime(new Date(inc.tsStart))
    onIncidentSelect(inc)
  }

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getIncidentColor = (type: string) => {
    switch (type) {
      case 'Gun Threat': return '#ef4444'
      case 'Unauthorised Access': return '#f97316'
      case 'Face Recognised': return '#eab308'
      case 'Traffic congestion': return '#3b82f6'
      default: return '#6b7280'
    }
  }

  if (!incident) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-400 text-lg">Select an incident to view</div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      <div className="flex-1 bg-black rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl text-gray-600 mb-6">📹</div>
            <div className="text-white text-2xl mb-3 font-medium">{incident.camera.name}</div>
            <div className="text-gray-400 text-lg">
              {formatDate(incident.tsStart)} - {formatTime(currentTime)}
            </div>
          </div>
        </div>
        
        <div className="absolute top-6 left-6 bg-red-600 text-white px-3 py-2 rounded text-sm font-medium">
          LIVE
        </div>
        
        <div className="absolute top-6 right-6 bg-black/70 text-white px-3 py-2 rounded text-sm">
          Camera {incident.camera.name.split(' ')[1]}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-3 mt-3 flex-shrink-0">
        <div className="text-white text-sm mb-2 font-medium flex items-center justify-between">
          <span>24-Hour Timeline</span>
          <span className="text-xs text-gray-400">{todaysIncidents.length} incidents today</span>
        </div>
        
        <svg
          ref={timelineRef}
          width="100%"
          height="40"
          className="cursor-pointer select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <rect width="100%" height="20" y="10" fill="#374151" rx="2" />
          
          {Array.from({ length: 25 }, (_, i) => (
            <g key={i}>
              <line
                x1={`${(i / 24) * 100}%`}
                y1="10"
                x2={`${(i / 24) * 100}%`}
                y2={i % 6 === 0 ? "5" : i % 3 === 0 ? "8" : "9"}
                stroke="#9ca3af"
                strokeWidth="1"
              />
              {i % 6 === 0 && (
                <text
                  x={`${(i / 24) * 100}%`}
                  y="4"
                  textAnchor="middle"
                  fill="#9ca3af"
                  fontSize="8"
                  className="font-mono"
                >
                  {i.toString().padStart(2, '0')}:00
                </text>
              )}
            </g>
          ))}
          
          {todaysIncidents.map((inc) => {
            const position = timeToPosition(new Date(inc.tsStart))
            const color = getIncidentColor(inc.type)
            const isSelected = inc.id === incident.id
            
            return (
              <g key={inc.id}>
                <circle
                  cx={`${position}%`}
                  cy="20"
                  r={isSelected ? "4" : "2"}
                  fill={color}
                  stroke={isSelected ? "#ffffff" : color}
                  strokeWidth={isSelected ? "1" : "0"}
                  className="cursor-pointer hover:r-3 transition-all"
                  onClick={() => handleIncidentClick(inc)}
                />
              </g>
            )
          })}
          
          <circle
            ref={scrubberRef}
            cx={`${timeToPosition(currentTime)}%`}
            cy="20"
            r="4"
            fill="#3b82f6"
            stroke="#ffffff"
            strokeWidth="1"
            className="cursor-grab active:cursor-grabbing"
          />
          
          <line
            x1={`${timeToPosition(currentTime)}%`}
            y1="10"
            x2={`${timeToPosition(currentTime)}%`}
            y2="30"
            stroke="#3b82f6"
            strokeWidth="1"
            opacity="0.7"
          />
        </svg>
      </div>
    </div>
  )
}