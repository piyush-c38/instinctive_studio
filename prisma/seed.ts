import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // creating cameras
  const cameras = await Promise.all([
    prisma.camera.create({
      data: {
        name: 'Shop Floor Camera A',
        location: 'Shop Floor',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Vault Camera B',
        location: 'Vault',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Entrance Camera C',
        location: 'Entrance',
      },
    }),
  ])

  console.log('Created cameras:', cameras.map(c => c.name))

  // Creating incidents across 24 hours with realistic timestamps
  const now = new Date()
  const incidents = [
    // Unauthorised Access incidents
    {
      cameraId: cameras[0].id,
      type: 'Unauthorised Access',
      thumbnailUrl: '/images/incidents/unauthorized-1.jpg',
      timestamp: new Date(now.getTime() - 23 * 60 * 60 * 1000), // 23 hours ago
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: 'Unauthorised Access',
      thumbnailUrl: '/images/incidents/unauthorized-2.jpg',
      timestamp: new Date(now.getTime() - 18 * 60 * 60 * 1000), // 18 hours ago
      resolved: false,
    },
    {
      cameraId: cameras[2].id,
      type: 'Unauthorised Access',
      thumbnailUrl: '/images/incidents/unauthorized-3.jpg',
      timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
      resolved: false,
    },
    {
      cameraId: cameras[0].id,
      type: 'Unauthorised Access',
      thumbnailUrl: '/images/incidents/unauthorized-4.jpg',
      timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
      resolved: false,
    },

    // Gun Threat incidents
    {
      cameraId: cameras[0].id,
      type: 'Gun Threat',
      thumbnailUrl: '/images/incidents/gun-threat-1.jpg',
      timestamp: new Date(now.getTime() - 20 * 60 * 60 * 1000), // 20 hours ago
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: 'Gun Threat',
      thumbnailUrl: '/images/incidents/gun-threat-2.jpg',
      timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000), // 8 hours ago
      resolved: false,
    },

    // Face Recognition incidents
    {
      cameraId: cameras[2].id,
      type: 'Face Recognised',
      thumbnailUrl: '/images/incidents/face-recognition-1.jpg',
      timestamp: new Date(now.getTime() - 22 * 60 * 60 * 1000), // 22 hours ago
      resolved: true,
    },
    {
      cameraId: cameras[0].id,
      type: 'Face Recognised',
      thumbnailUrl: '/images/incidents/face-recognition-2.jpg',
      timestamp: new Date(now.getTime() - 15 * 60 * 60 * 1000), // 15 hours ago
      resolved: true,
    },
    {
      cameraId: cameras[1].id,
      type: 'Face Recognised',
      thumbnailUrl: '/images/incidents/face-recognition-3.jpg',
      timestamp: new Date(now.getTime() - 10 * 60 * 60 * 1000), // 10 hours ago
      resolved: true,
    },
    {
      cameraId: cameras[2].id,
      type: 'Face Recognised',
      thumbnailUrl: '/images/incidents/face-recognition-4.jpg',
      timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
      resolved: true,
    },

    // traffic congestion incidents
    {
      cameraId: cameras[2].id,
      type: 'Traffic congestion',
      thumbnailUrl: '/images/incidents/traffic-1.jpg',
      timestamp: new Date(now.getTime() - 16 * 60 * 60 * 1000), // 16 hours ago
      resolved: true,
    },
    {
      cameraId: cameras[0].id,
      type: 'Traffic congestion',
      thumbnailUrl: '/images/incidents/traffic-2.jpg',
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      resolved: false,
    },
  ]

  const createdIncidents = await Promise.all(
    incidents.map(incident =>
      prisma.incident.create({
        data: incident,
      })
    )
  )

  console.log(`Created ${createdIncidents.length} incidents`)
  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
