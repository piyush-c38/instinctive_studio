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

## Deployment Instructions

### Production Build

1. Create a production build:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Deploy on Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. **Important**: Set up a PostgreSQL database for production:
   - Go to Vercel Dashboard → Storage → Create Database → Postgres
   - Copy the connection string
4. Set up environment variables in Vercel:
   - `DATABASE_URL`: Your PostgreSQL connection string from step 3
5. **Before deploying**: Update your `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // Change from "sqlite" to "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
6. Deploy your application
7. **After first deployment**: Run database migrations:
   - Go to Vercel → Functions → Run `npx prisma migrate deploy`
   - Or use Vercel CLI: `vercel env pull` then `npx prisma db push`

#### Troubleshooting API 500 Errors
- Check `/api/health` endpoint to verify database connection
- Ensure `DATABASE_URL` environment variable is correctly set
- Verify Prisma schema uses `postgresql` provider for production

### Deploy on Other Platforms

For other platforms (Railway, Render, etc.):
1. Build the application: `npm run build`
2. Set the start command to: `npm start`
3. Set Node.js version to 18+
4. Configure environment variables including PostgreSQL `DATABASE_URL`

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