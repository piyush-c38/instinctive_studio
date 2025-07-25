'use client'

import { useState, useEffect } from 'react'
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
  isStart: boolean
  tsEnd: string | null
  thumbnailUrl: string
  resolved: boolean
  timestamp: string
  createdAt: string
  updatedAt: string
}

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIncidents()
  }, [])

  const fetchIncidents = async () => {
    try {
      const response = await fetch('/api/incidents')
      const data = await response.json()
      setIncidents(data)
      if (data.length > 0) {
        setSelectedIncident(data[0])
      }
    } catch (error) {
      console.error('Failed to fetch incidents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResolveIncident = async (incidentId: string) => {
    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: 'PATCH',
      })
      
      if (response.ok) {
        const updatedIncident = await response.json()
        setIncidents(prev => 
          prev.map(incident => 
            incident.id === incidentId 
              ? { ...incident, resolved: true }
              : incident
          )
        )
        
        if (selectedIncident?.id === incidentId) {
          setSelectedIncident(prev => prev ? { ...prev, resolved: true } : null)
        }
      }
    } catch (error) {
      console.error('Failed to resolve incident:', error)
    }
  }

  const unresolvedIncidents = incidents.filter(incident => !incident.resolved)
  const cameras = Array.from(new Set(incidents.map(i => i.camera))).filter(Boolean)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1530] text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a1530] text-white pb-64">
      <Navbar unresolvedCount={unresolvedIncidents.length} />
      
      <div className="flex">
        {/* left side - incident Player */}
        <div className="flex-1 p-6">
          <IncidentPlayer 
            incident={selectedIncident}
            onIncidentSelect={setSelectedIncident}
          />
        </div>
        
        {/* right side - incident List */}
        <div className="w-96 border-l border-gray-700">
          <IncidentList 
            incidents={incidents}
            selectedIncident={selectedIncident}
            onIncidentSelect={setSelectedIncident}
            onResolveIncident={handleResolveIncident}
          />
        </div>
      </div>
      
      {/* Bottom Timeline */}
      <IncidentTimeline 
        incidents={incidents}
        cameras={cameras}
        onIncidentSelect={setSelectedIncident}
        selectedIncident={selectedIncident}
      />
    </div>
  )
}
