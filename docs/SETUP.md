# Setup Instructions

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Anthropic API key (optional for demo)

## Installation Steps

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/campus-sahayak.git
cd campus-sahayak
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` file and add your API keys (optional):
REACT_APP_ANTHROPIC_API_KEY=your_api_key_here

### 4. Start development server
```bash
npm start
```

The app will open at `http://localhost:3000`

### 5. Build for production
```bash
npm run build
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=build
```

## Troubleshooting

### Issue: npm install fails

**Solution:** Clear npm cache and try again
```bash
npm cache clean --force
npm install
```

### Issue: Port 3000 already in use

**Solution:** Kill the process or use a different port
```bash
PORT=3001 npm start
```

### Issue: Tailwind styles not working

**Solution:** Make sure tailwind.config.js is properly configured
```bash
npx tailwindcss init -p
```

## Development Tips

- Use `npm start` for development with hot reload
- Use `npm test` to run tests
- Use `npm run build` to create production build
- Check browser console for errors

## Next Steps

- Read [USER_GUIDE.md](USER_GUIDE.md) to learn how to use the app
- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute