# Finance OS - MISSION CONTROL & AI CO-PILOT

## Overview
A comprehensive React + TypeScript application featuring two integrated screens for financial intelligence and management.

### Screens Implemented

#### 1. MISSION CONTROL (Home Entry Point)
The HOME entry point of Finance OS featuring:

**Motion System**
- KPI cards animate in staggered sequence (80-120ms between cards)
  - opacity: 0 → 1
  - y: 20 → 0
- Financial metrics count up animation (Health Score, Runway, Burn Rate)
- AI Insight card appears last with fade in + scale 0.98 → 1
- Hero text animation: "YOU'RE 73% ON TRACK" with fade + slight scale up

**Key Components**
- Animated KPI cards (Financial Health, Runway, Burn Rate)
- Greeting section with personalized message
- AI insight sections (Analysis & Bills/Payments)
- Call-to-action buttons for navigation

#### 2. AI CO-PILOT (Financial Decision Engine)
An intelligent AI assistant that analyzes financial decisions in real-time.

**Motion System - Loading State**
Sequential loading messages with 700ms transitions:
1. "Analyzing financial behavior..."
2. "Projecting future outcomes..."
3. "Calculating financial risk..."

**Results Animation**
Staggered reveal of analysis components:
1. Analysis block (fade + y: 20 → 0, delay: 0.1s)
2. Financial impact block (delay: 0.3s)
3. Recommendation block (delay: 0.5s)
4. Risk indicator (last element, delay: 0.7s)

**Features**
- Real-time financial impact calculations
- Animated number transitions (count up)
- Dynamic risk level indicator (Low → Medium → High)
- Contextual recommendations
- Multiple CTA options:
  - See Future Outcome
  - Explore Wealth Map
  - Try Another Decision
  - Back to Mission Control

## Technology Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Node Version**: 18+

## Installation & Running

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Server will be available at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm preview
```

## Project Structure
```
Figma-MCP-VSCode/
├── src/
│   ├── components/
│   │   ├── MissionControl.tsx    # Home screen with KPI cards & animations
│   │   └── AICoPilot.tsx         # Financial decision engine
│   ├── App.tsx                    # Root app with navigation logic
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── tailwind.config.js             # Tailwind configuration
├── vite.config.ts                 # Vite configuration
└── package.json                   # Dependencies
```

## Design System
Colors used across both screens:
- **Primary**: #87A330 (Primary Green)
- **Black**: #1B1B1B
- **Grey**: #848482
- **Forest Green**: #243010
- **Positive Green**: #4CAF50
- **Vanilla Cream**: #FFFDF7
- **Background**: #F7F8F9
- **White**: #FFFFFF

Typography:
- **Font Family**: General Sans
- **Weights**: Regular, Medium, Semibold

## Animation Timing

### Mission Control
- KPI Card Stagger: 80-120ms between cards
- Individual Card Duration: 600ms
- Hero Text Duration: 700ms (200ms delay)
- AI Insight Duration: 700ms (400ms delay)

### AI CO-PILOT
- Loading Message Cycle: 700ms each message
- Total Loading Duration: 2100ms
- Analysis Block: 600ms (100ms delay)
- Financial Impact: 600ms (300ms delay)
- Recommendation: 600ms (500ms delay)
- Risk Indicator: 700ms (700ms delay)

## Navigation
- **Mission Control → AI CO-PILOT**: Click "Open Skip Co-Pilot" button
- **AI CO-PILOT → Mission Control**: Click "Back to Mission Control" CTA after results

## Features

### MISSION CONTROL
- System boot-up feel with staggered animations
- Real-time KPI cards with financial metrics
- AI insights for spending patterns
- Quick action buttons for analysis
- Responsive layout

### AI CO-PILOT
- Conversational financial analysis interface
- Real-time decision impact calculation
- Animated metric transitions
- Risk level indicators with dynamic styling
- Multiple decision pathways
- Loading state animations
- Result reveal animations

## Notes
- All Figma assets loaded from remote URLs (7-day expiry)
- No design system modifications made
- Component structure maintains Figma design accuracy
- Hot module reloading enabled for development
- Fully responsive design
