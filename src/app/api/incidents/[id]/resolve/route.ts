import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const currentIncident = await prisma.incident.findUnique({
      where: { id },
    })
    
    if (!currentIncident) {
      return NextResponse.json(
        { error: 'Incident not found' },
        { status: 404 }
      )
    }
    
    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: !currentIncident.resolved },
      include: {
        camera: true,
      },
    })
    
    return NextResponse.json(updatedIncident)
  } catch (error) {
    console.error('Error resolving incident:', error)
    return NextResponse.json(
      { error: 'Failed to resolve incident' },
      { status: 500 }
    )
  }
}
