# React Calendar View – Admin Tool Component

This project provides a reusable calendar view component built with Next.js, React, and TypeScript. The component is designed for internal admin tooling to visualize apartment-specific activities using color-coded calendar days.

---

## Prerequisites

The following tools are required to run and maintain this project:

| Package       | Purpose                      |
|---------------|------------------------------|
| Next.js       | Application framework        |
| React         | UI rendering                 |
| TypeScript    | Static typing                |
| TailwindCSS   | UI styling                   |

A working knowledge of these tools is required for collaboration.

---

## Local Development Setup

1. Install dependencies:
```bash
npm install
```
2. Startup the application:
```bash
npm run dev
```
> The application will run on http://localhost:3000

## Folder Structure
```
project-root/
├── app/
│   ├── _assets/
│   │   ├── days-months-string.json    # Month and weekday labels
│   │   └── test_dataset.json          # Sample activity data for testing
│   │
│   ├── _components/
│   │   └── calendar_generator.tsx     # Calendar UI component
│   │
│   ├── _utils/
│   │   └── generate-calendar-data.ts  # Calendar data generation logic
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                       # Application entry point
│
├── public/
│   └── next.svg
│
├── .gitignore
├── CHANGELOG.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Component Usage
1. Calendar View Component

```
The calendar component accepts two props:

[x] - defaultCurrentDate – The date used to initialize the calendar view
[x] - highlightedList – An array of activity objects containing date, label, and color code

<RenderCalendarView
  defaultCurrentDate={new Date()}
  highlightedList={[
   {
      "date": new Date("2026-01-10T00:00:00.000Z"),
      "hex": "#FD7979",
      "reason": "Room Occupied"
    }
  ]}
/>
```
2. Calendar Data Generator

```
The calendar logic is separated into a utility function that produces structured calendar data for rendering.


generateCalendarDays({
  currentDay,
  highlightedList
});

The function returns an array containing:
[x] - month
[x] - day
[x] - weekday
[x] - year
[x] - currentMonth
[x] - selection
[x] - highlight metadata

This separation ensures the UI remains clean and testable.
```