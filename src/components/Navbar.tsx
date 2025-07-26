'use client'

import { User, AlertTriangle } from 'lucide-react'

interface NavbarProps {
  unresolvedCount: number
}

export default function Navbar({ unresolvedCount }: NavbarProps) {
  return (
    <nav className="bg-[#142555] border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white text-[#1e3a8a] rounded flex items-center justify-center font-bold">
              M
            </div>
            <span className="text-xl font-bold text-white">MANDLACX</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>Dashboard</span>
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                <span>Cameras</span>
              </span>
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                <span>Scenes</span>
              </span>
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              <span className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Incidents</span>
              </span>
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              <span className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Users</span>
              </span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">{unresolvedCount} Unresolved Incidents</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span className="text-sm">4 resolved incidents</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <div className="text-white">Mohammed Ajhas</div>
              <div className="text-gray-300 text-xs">ajhas@mandlacx.com</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
