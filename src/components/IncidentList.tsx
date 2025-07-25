'use client'

import { Clock, MapPin, CheckCircle, AlertTriangle } from 'lucide-react'

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

interface IncidentListProps {
    incidents: Incident[]
    selectedIncident: Incident | null
    onIncidentSelect: (incident: Incident) => void
    onResolveIncident: (incidentId: string) => void
}

export default function IncidentList({
    incidents,
    selectedIncident,
    onIncidentSelect,
    onResolveIncident
}: IncidentListProps) {
    const getIncidentIcon = (type: string) => {
        switch (type) {
            case 'Gun Threat':
                return '🔫'
            case 'Unauthorised Access':
                return '🚨'
            case 'Face Recognised':
                return '👤'
            case 'Traffic congestion':
                return '🚗'
            default:
                return '⚠️'
        }
    }

    const getIncidentColor = (type: string) => {
        switch (type) {
            case 'Gun Threat':
                return 'text-red-400'
            case 'Unauthorised Access':
                return 'text-orange-400'
            case 'Face Recognised':
                return 'text-blue-400'
            case 'Traffic congestion':
                return 'text-green-400'
            default:
                return 'text-gray-400'
        }
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    const unresolvedIncidents = incidents.filter(incident => !incident.resolved)

    return (
        <div className="h-full bg-gray-900/50 flex flex-col">
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <h2 className="text-lg font-semibold text-white">{unresolvedIncidents.length} Unresolved Incidents</h2>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span>{incidents.filter(i => !i.resolved && i.type === 'Unauthorised Access').length} resolved incidents</span>
                    </span>
                </div>
            </div>

            {/* Incident List */}
            <div className="flex-1 overflow-y-auto">
                {incidents.map((incident) => (
                    <div
                        key={incident.id}
                        onClick={() => onIncidentSelect(incident)}
                        className={`p-4 border-b border-gray-700/50 cursor-pointer transition-all hover:bg-gray-800/50 ${selectedIncident?.id === incident.id ? 'bg-blue-900/30 border-l-4 border-l-blue-400' : ''
                            } ${incident.resolved ? 'opacity-60' : ''}`}
                    >
                        <div className="flex items-start space-x-3">
                            <div className="w-16 h-12 bg-gray-700 rounded flex-shrink-0 flex items-center justify-center">
                                <span className="text-xs text-gray-400">IMG</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">{getIncidentIcon(incident.type)}</span>
                                        <span className={`text-sm font-medium ${getIncidentColor(incident.type)}`}>
                                            {incident.type}
                                        </span>
                                    </div>
                                    {incident.resolved && (
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    )}
                                </div>

                                <div className="mt-1 flex items-center space-x-2 text-xs text-gray-400">
                                    <MapPin className="w-3 h-3" />
                                    <span>{incident.camera.name}</span>
                                </div>

                                <div className="mt-1 flex items-center space-x-2 text-xs text-gray-400">
                                    <Clock className="w-3 h-3" />
                                    <span>{formatTime(incident.timestamp)} on {formatDate(incident.timestamp)}</span>
                                </div>

                                {!incident.resolved && (
                                    <div className="mt-3">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onResolveIncident(incident.id)
                                            }}
                                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
                                        >
                                            Resolve →
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
