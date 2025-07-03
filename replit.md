# Sudaislofar - Hinglish Chatbot

## Overview

This is a modern web-based chatbot application featuring "Sudaislofar," a friendly AI companion that communicates in Hinglish (Hindi-English mix). The application is built as a full-stack TypeScript project with a React frontend and Express backend, featuring a sophisticated UI component system and database integration capabilities.

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
- **Personality**: Friendly, casual Hinglish communication style
- **Response System**: Comprehensive predefined response database with categorized replies
- **UI Elements**: Dark-themed chat interface with message bubbles and typing indicators
- **Animations**: Smooth fade-in animations for messages and auto-scroll functionality

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

1. **User Interaction**: User types message in chat input
2. **Message Processing**: Frontend processes input and adds to message state
3. **Response Generation**: Local response matching logic generates appropriate Hinglish replies
4. **UI Updates**: Messages appear with animations, auto-scroll to latest
5. **Session Persistence**: User sessions managed via PostgreSQL (when implemented)

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database queries
- **express**: Web application framework
- **react**: UI library with hooks

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
- July 03, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```