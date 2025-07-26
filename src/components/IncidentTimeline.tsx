'use client'

import { useState } from 'react'

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

interface IncidentTimelineProps {
  incidents: Incident[]
  cameras: Camera[]
  onIncidentSelect: (incident: Incident) => void
  selectedIncident: Incident | null
}

export default function IncidentTimeline({ 
  incidents, 
  cameras = [], 
  onIncidentSelect, 
  selectedIncident 
}: IncidentTimelineProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = String(i).padStart(2, '0')
    return `${hour}:00`
  })

  const getIncidentColor = (type: string) => {
    switch (type) {
      case 'Gun Threat':
        return 'bg-red-500'
      case 'Unauthorised Access':
        return 'bg-orange-500'
      case 'Face Recognised':
        return 'bg-blue-500'
      case 'Traffic congestion':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getPositionFromTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const hour = date.getHours()
    const minute = date.getMinutes()
    return ((hour + minute / 60) / 24) * 100
  }

  const mockCameras = [
    { id: '1', name: 'Camera - 01', location: 'Shop Floor' },
    { id: '2', name: 'Camera - 02', location: 'Vault' },
    { id: '3', name: 'Camera - 03', location: 'Entrance' }
  ]

  const cameraList = cameras.length > 0 ? cameras : mockCameras

  if (!isExpanded) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-gray-700">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-4 text-left text-white hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Camera List</h3>
              <p className="text-sm text-gray-400">View incident timeline</p>
            </div>
            <div className="text-gray-400">▲</div>
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-gray-700 h-64">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Camera List</h3>
          <button
            onClick={() => setIsExpanded(false)}
            className="text-gray-400 hover:text-white"
          >
            ▼
          </button>
        </div>
        
        <div className="space-y-3">
          {cameraList.map((camera, cameraIndex) => (
            <div key={camera.id} className="flex items-center space-x-4">
              <div className="w-24 text-sm text-white flex-shrink-0 flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>{camera.name}</span>
              </div>
              
              <div className="flex-1 relative">
                <div className="h-8 bg-gray-800 rounded relative overflow-hidden">
                  <div className="absolute inset-0 flex">
                    {hours.map((hour, index) => (
                      <div
                        key={hour}
                        className="flex-1 border-r border-gray-700 flex items-center justify-center text-xs text-gray-500"
                        style={{ borderRight: index === hours.length - 1 ? 'none' : undefined }}
                      >
                        {index % 4 === 0 ? hour : ''}
                      </div>
                    ))}
                  </div>
                  
                  {incidents
                    .filter(incident => incident.camera.name === camera.name)
                    .map((incident) => (
                      <div
                        key={incident.id}
                        onClick={() => onIncidentSelect(incident)}
                        className={`absolute top-1 h-6 w-3 rounded cursor-pointer transition-all hover:scale-110 ${getIncidentColor(incident.type)} ${
                          selectedIncident?.id === incident.id ? 'ring-2 ring-white' : ''
                        } ${incident.resolved ? 'opacity-50' : ''}`}
                        style={{
                          left: `${getPositionFromTime(incident.tsStart)}%`,
                        }}
                        title={`${incident.type} - ${new Date(incident.tsStart).toLocaleTimeString()}`}
                      />
                    ))}
                  
                  
                  <div className="absolute top-0 bottom-0 w-0.5 bg-yellow-400" style={{ left: '60%' }}>
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center space-x-6 text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>Unauthorised Access</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Face Recognised</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Gun Threat</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Traffic congestion</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-0.5 h-3 bg-yellow-400"></div>
            <span>Current Time</span>
          </div>
        </div>
      </div>
    </div>
  )
}
