'use client'

import { useState, useEffect } from 'react'
import { Play, SkipBack, SkipForward, Volume2, Maximize2 } from 'lucide-react'
import Navbar from './Navbar'
import IncidentPlayer from './IncidentPlayer'
import IncidentList from './IncidentList'
import IncidentTimeline from './IncidentTimeline'

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

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchIncidents()
  }, [])

  const fetchIncidents = async () => {
    try {
      setError(null)
      const response = await fetch('/api/incidents')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      // Ensure data is an array
      const incidentsArray = Array.isArray(data) ? data : []
      setIncidents(incidentsArray)
      if (incidentsArray.length > 0) {
        setSelectedIncident(incidentsArray[0])
      }
    } catch (error) {
      console.error('Failed to fetch incidents:', error)
      setError('Failed to load incidents. Please try again.')
      setIncidents([]) // Set to empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleResolveIncident = async (incidentId: string) => {
    try {
      setIncidents(prev => 
        prev.map(incident => 
          incident.id === incidentId 
            ? { ...incident, resolved: !incident.resolved }
            : incident
        )
      )
      
      if (selectedIncident?.id === incidentId) {
        setSelectedIncident(prev => prev ? { ...prev, resolved: !prev.resolved } : null)
      }
      
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: 'PATCH',
      })
      
      if (!response.ok) {
        setIncidents(prev => 
          prev.map(incident => 
            incident.id === incidentId 
              ? { ...incident, resolved: !incident.resolved }
              : incident
          )
        )
        
        if (selectedIncident?.id === incidentId) {
          setSelectedIncident(prev => prev ? { ...prev, resolved: !prev.resolved } : null)
        }
        throw new Error('Failed to resolve incident')
      }
      
    } catch (error) {
      console.error('Failed to resolve incident:', error)
    }
  }

  const unresolvedIncidents = (incidents || []).filter(incident => !incident.resolved)
  const cameras = Array.from(new Set((incidents || []).map(i => i.camera))).filter(Boolean)

  if (loading) {
    return (
      <div className="h-screen bg-[#0a1530] text-white flex items-center justify-center">
        <div className="text-xl">Loading SecureSight Dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen bg-[#0a1530] text-white flex items-center justify-center flex-col">
        <div className="text-xl mb-4">⚠️ {error}</div>
        <button 
          onClick={() => {
            setLoading(true)
            fetchIncidents()
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="h-screen bg-[#0a1530] text-white flex flex-col overflow-hidden">
      <Navbar unresolvedCount={unresolvedIncidents.length} />
      
      <div className="flex h-[55%]">
        <div className="w-[55%] p-4">
          <IncidentPlayer 
            incident={selectedIncident}
            onIncidentSelect={setSelectedIncident}
            incidents={incidents}
          />
        </div>
        
        <div className="w-[45%] border-l border-gray-700">
          <IncidentList 
            incidents={incidents}
            selectedIncident={selectedIncident}
            onIncidentSelect={setSelectedIncident}
            onResolveIncident={handleResolveIncident}
          />
        </div>
      </div>
      
      <div className="h-[5%] bg-gray-900 border-t border-gray-700 flex items-center justify-center px-6">
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
            <Play className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-white p-1">
            <SkipBack className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-white p-1">
            <SkipForward className="w-4 h-4" />
          </button>
          <div className="text-white text-sm font-mono">
            03:12:37 (15-Jun-2025)
          </div>
          <div className="flex-1 mx-6">
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div className="bg-blue-600 h-1 rounded-full" style={{ width: '35%' }}></div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white p-1">
            <Volume2 className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-white p-1">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="h-[35%] flex flex-col">
        <IncidentTimeline 
          incidents={incidents}
          cameras={cameras}
          onIncidentSelect={setSelectedIncident}
          selectedIncident={selectedIncident}
        />
      </div>
    </div>
  )
}
