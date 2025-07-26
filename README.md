# SecureSight CCTV Monitoring Dashboard

A modern CCTV monitoring dashboard built with Next.js for real-time incident management and video surveillance.

## Features

- **Real-time Incident Monitoring**
- **Interactive Timeline**
- **Multi-Camera Support**
- **Responsive Design**
- **Incident Management**

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/piyush-c38/instinctive_studio.git
cd instinctive_studio
```

2. Install dependencies:
```bash
npm install

```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

4. Run the development server:
```bash
npm run dev

```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Decisions

### Frontend Framework
- **Next.js 15**: Chose for its App Router, TypeScript support, and excellent developer experience
- **React 18**: Latest features including Suspense and concurrent rendering.
- **TypeScript**: Type-Safety and better development.

### Styling
- **Tailwind CSS**: An obvious choice for rapid UI development with utility-first approach.
- **Lucide React**: As it has consistent icon library for modern UI components.

### Database & Backend
- **SQLite + Prisma**: Simple setup for development with ORM for type safety
- **API Routes**: Next.js built-in API functionality for backend operations

## If I had more time...

- **Enhanced UI/UX**: If I had more time then I would have surely made the UI colors more appealing to eyes. To such extent that it would have itself done the work of UX just like what 'Samsung' does with their One UI.

- **Real-time Features**: WebSocket integration for live incident updates and real-time camera feeds


## API Endpoints

- `GET /api/incidents` - Fetch all incidents
- `PUT /api/incidents/[id]` - Update incident (resolve/unresolve)
- `GET /api/cameras` - Fetch all cameras

### Updated On: 27th July 2025