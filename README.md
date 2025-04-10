# Next.js Dashboard with Supabase Auth

This is a Next.js application with a dashboard using shadcn UI components, Tailwind CSS, and Supabase authentication.

## Setup

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. The project already includes a `.env` file with Supabase credentials

## Supabase Setup

1. Create a new project in [Supabase](https://supabase.com)
2. Navigate to the SQL Editor in your Supabase dashboard
3. Run the SQL commands from `migrations/01_create_users_table.sql` to set up the users table

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Authentication Flow

1. Users can register at `/register`
2. After registration, they'll be redirected to `/login`
3. After login, they'll be redirected to `/dashboard`
4. The dashboard and profile pages are protected and require authentication

## Features

- Next.js with App Router
- Tailwind CSS for styling
- shadcn UI components
- Supabase authentication
- Protected routes
- User profiles
- Responsive design

## Directory Structure

- `/app` - Next.js app router pages and layouts
- `/components` - UI components, including shadcn components
- `/components/auth` - Authentication components (login and register forms)
- `/lib` - Utility functions and context providers
- `/migrations` - SQL migration files for Supabase setup
