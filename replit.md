# Sudaislofar - Hinglish Chatbot

## Overview

This is a modern web-based chatbot application featuring "Sudaislofar," a friendly AI companion powered by Google's Gemini AI that communicates in Hinglish (Hindi-English mix). The application is built as a full-stack TypeScript project with a React frontend and Express backend, featuring real AI intelligence, HTML-formatted responses, and a responsive two-column layout with sidebar navigation.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom dark theme variables
- **State Management**: TanStack Query for server state and local React state
- **Routing**: Wouter for lightweight client-side routing
- **Font**: Inter (Google Fonts) for clean, readable typography

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL support
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development Server**: Custom Vite integration with HMR support
- **Production Build**: ESBuild for server bundling

### Database Architecture
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with Zod schema validation
- **Migrations**: Drizzle Kit for schema migrations
- **Connection**: Neon Database serverless driver

## Key Components

### Chatbot Core Features
- **AI Intelligence**: Powered by Google's Gemini 2.5 Flash model for intelligent responses
- **Personality**: Friendly, casual Hinglish communication style maintained through AI prompting
- **HTML Formatting**: AI generates properly formatted HTML responses with headings, bold text, and lists
- **UI Layout**: Two-column responsive design with sidebar navigation and expanded chat area
- **Response Quality**: Can answer any question, write poetry, solve problems, and engage naturally

### UI Component System
- **Design System**: Complete shadcn/ui component library
- **Theme**: Dark mode optimized with custom CSS variables
- **Components**: 40+ reusable UI components (buttons, inputs, dialogs, etc.)
- **Accessibility**: Radix UI primitives ensure WCAG compliance
- **Responsive**: Mobile-first design with responsive breakpoints

### Development Tools
- **Hot Reload**: Vite development server with React Fast Refresh
- **Error Handling**: Runtime error overlay for development
- **TypeScript**: Strict type checking with path aliases
- **Code Quality**: ESLint and Prettier integration (implied)

## Data Flow

1. **User Interaction**: User types message in expanded chat input area
2. **Message Processing**: Frontend sends message to backend API endpoint
3. **AI Processing**: Gemini AI generates intelligent Hinglish response with HTML formatting
4. **Response Delivery**: Backend returns formatted HTML response to frontend
5. **UI Rendering**: Messages displayed with proper HTML formatting, animations, and auto-scroll

## External Dependencies

### Core Dependencies
- **@google/genai**: Google Gemini AI integration for intelligent responses
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database queries (configured but not actively used)
- **express**: Web application framework with API endpoints
- **react**: UI library with hooks and HTML rendering support

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives (20+ components)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **esbuild**: Fast server bundling for production

## Deployment Strategy

### Development Environment
- **Dev Server**: `npm run dev` starts Express server with Vite middleware
- **Hot Reload**: Full-stack development with instant refresh
- **Error Handling**: Development error overlay and logging

### Production Build
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations via `npm run db:push`
- **Start**: `npm start` runs production server

### Database Setup
- **Environment**: Requires `DATABASE_URL` environment variable
- **Migrations**: Schema defined in `shared/schema.ts`
- **Dialect**: PostgreSQL with serverless connection support

## Changelog

```
Changelog:
- July 03, 2025. Initial setup with predefined responses
- July 03, 2025. Integrated Google Gemini AI for intelligent responses
- July 03, 2025. Added HTML formatting support for rich responses
- July 03, 2025. Implemented two-column layout with sidebar navigation
- July 03, 2025. Enhanced chat interface with expanded message display
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```