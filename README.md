# SamparkX

![SamparkX Logo](public/SamparkX.png)

## AI-Powered Lead Generation Platform

SamparkX is a modern, AI-driven lead generation platform that helps you discover high-quality business leads in seconds. It features a beautiful, responsive frontend built with React, Vite, Tailwind CSS, and Framer Motion, and leverages a powerful n8n backend workflow for data extraction and enrichment from sources like Google Maps.

---

## Features
- **AI-Powered Lead Discovery:** Instantly find and enrich business leads by industry and location.
- **Modern UI/UX:** Responsive, animated interface with custom branding and logo.
- **Customizable Search:** Search by industry and location, with real-time feedback and loading states.
- **Detailed Lead Cards:** Each lead includes company name, address, website, phone, email, category, rating, and more.
- **Testimonials & Why Choose Us:** Social proof and feature highlights to boost trust.
- **Contact & Support:** Direct support email and live chat info.
- **Full Branding:** All icons, favicon, and meta images use your custom logo (`SamparkX.png`).

---

## Tech Stack
- **Frontend:**
  - React + TypeScript
  - Vite (for fast development)
  - Tailwind CSS (utility-first styling)
  - Framer Motion (animations)
- **Backend:**
  - [n8n](https://n8n.io/) (no-code/low-code workflow automation)
  - Google Maps, LLMs (Gemini, OpenAI, Groq), custom data cleaning and enrichment

---

## Project Structure
```
lead-nexus-visualizer/
├── public/
│   ├── SamparkX.png         # Main logo and favicon
│   ├── favicon.ico          # (Replaced by SamparkX.png)
│   └── ...
├── src/
│   ├── components/          # UI and page components
│   ├── pages/               # Main pages (Landing, Lead Generation, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript types
│   └── ...
├── index.html               # Main HTML, meta tags, favicon, og:image, etc.
├── package.json             # Project dependencies
└── README.md                # (This file)
```

---

## Setup & Installation

### 1. **Clone the Repository**
```bash
git clone <your-repo-url>
cd lead-nexus-visualizer
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Run the Development Server**
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 4. **Build for Production**
```bash
npm run build
```

---

## Custom Branding
- **Logo & Favicon:**
  - The logo and favicon are set to `public/SamparkX.png`.
  - Update this file to change the branding everywhere (browser tab, social share, etc.).
- **Meta Tags:**
  - All Open Graph and Twitter meta images use `/SamparkX.png`.

---

## Backend: n8n Workflow
SamparkX uses an n8n workflow to fetch, clean, and enrich business leads. The workflow:
- Accepts POST requests at the webhook endpoint:  
  `https://dhruvthc.app.n8n.cloud/webhook/d728827d-2772-434f-aef7-68d5111b675f`
- Takes `industry` and `location` as input.
- Scrapes Google Maps and other sources for business data.
- Cleans and parses raw data using custom JavaScript and LLMs (Gemini, OpenAI, Groq).
- Extracts and validates emails, phone numbers, and other details.
- Returns a JSON array of leads with fields:
  - `companyName`, `exactAddress`, `category`, `website`, `phoneNumber`, `emailAddress`, `rating`, `ratingCount`

**n8n Workflow Highlights:**
- Multi-step data cleaning and enrichment
- LLM-powered extraction and validation
- Handles noisy, irregular web data
- Returns clean, deduplicated leads

---

## Environment & Configuration
- No environment variables are required for the frontend.
- The backend webhook URL is hardcoded in the frontend fetch call (see `src/pages/LeadGeneration.tsx`).
- To use your own n8n instance, update the webhook URL in the code.

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)

---

## Contact
- Email: [support@samparkx.com](mailto:support@samparkx.com)
- Website: [https://samparkx.com](https://samparkx.com)
