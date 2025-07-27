import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const startTime = Date.now()
  
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { 
          status: 'error', 
          database: 'misconfigured',
          error: 'DATABASE_URL environment variable not set',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    console.log('Health check: Testing database connection...')
    
    // Test database connection with timeout
    await Promise.race([
      prisma.$connect(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout after 10s')), 10000)
      )
    ])
    
    console.log('Health check: Connection successful, testing query...')
    
    // Test a simple query with timeout
    const count = await Promise.race([
      prisma.incident.count(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Query timeout after 10s')), 10000)
      )
    ]) as number
    
    const responseTime = Date.now() - startTime
    console.log(`Health check: Success in ${responseTime}ms`)
    
    return NextResponse.json({ 
      status: 'ok', 
      database: 'connected',
      incidentCount: count,
      responseTime: `${responseTime}ms`,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    console.error('Health check failed:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      errno: (error as any)?.errno,
      responseTime: `${responseTime}ms`
    })
    
    return NextResponse.json(
      { 
        status: 'error', 
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime: `${responseTime}ms`,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
        errorCode: (error as any)?.code || 'UNKNOWN'
      },
      { status: 500 }
    )
  }
}
