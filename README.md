# ConceptForge AI

ConceptForge AI is a lightweight, AI-powered web application for early-stage architectural concept ideation. It helps architects generate deep design philosophies, material palettes, and zoning strategies based on simple inputs like project type, location, and stylistic preferences.

## Features
- **Configurable LLM Backends**: Seamlessly toggle between Google's Gemini-2.5-flash and OpenAI's GPT-4o-mini inside the user interface.
- **Architectural Outputs**: Get highly structured JSON responses providing zoning breakdowns, material palettes, and conceptual overviews.
- **Modern UI**: Polished, fully responsive UI built with Tailwind CSS, Next.js 14 App Router, and motion/react micro-animations.

## Prerequisites
- Node.js 18.x or later.
- API keys from [Google AI Studio](https://aistudio.google.com/) and/or [OpenAI](https://platform.openai.com/api-keys).

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API Keys**
   Configure your environment variables in `.env.local` located in the root of the project:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack
- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React**
- **Motion (Framer Motion)**
- **@google/genai** SDK & **openai** SDK
