import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
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
