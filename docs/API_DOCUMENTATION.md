# API Documentation

## Overview

Campus Sahayak uses the Anthropic Claude API for AI-powered features.

## API Endpoints

### Claude API

**Base URL:** `https://api.anthropic.com/v1/messages`

**Authentication:** API key required (not needed in artifacts)

## Service Functions

### 1. Chat Service

**File:** `src/services/claudeAPI.js`

#### sendChatMessage(messages, userQuery)

Sends a message to the AI assistant.

**Parameters:**
- `messages` (Array): Conversation history
- `userQuery` (String): User's question

**Returns:** Promise<String> - AI response

**Example:**
```javascript
import { sendChatMessage } from './services/claudeAPI';

const response = await sendChatMessage([], "Help me with DSA");
```

### 2. Resume Analysis

#### analyzeResume()

Analyzes a sample resume and provides ATS score.

**Returns:** Promise<Object>
```javascript
{
  score: number,
  improvements: string[],
  strengths: string[]
}
```

**Example:**
```javascript
import { analyzeResume } from './services/claudeAPI';

const result = await analyzeResume();
console.log(result.score); // 72
```

### 3. Study Plan Generator

#### generateStudyPlan(subjects, days)

Generates a personalized study plan.

**Parameters:**
- `subjects` (String): Comma-separated subjects
- `days` (Number): Number of days for the plan

**Returns:** Promise<Object>
```javascript
{
  days: [
    {
      day: string,
      tasks: string[]
    }
  ]
}
```

**Example:**
```javascript
import { generateStudyPlan } from './services/claudeAPI';

const plan = await generateStudyPlan("DSA, OS", 7);
```

## Custom Hooks

### useChat()

**File:** `src/hooks/useChat.js`
```javascript
const { messages, loading, sendMessage, clearChat } = useChat();
```

**Returns:**
- `messages`: Array of chat messages
- `loading`: Boolean loading state
- `sendMessage(msg)`: Function to send message
- `clearChat()`: Function to clear conversation

### useStudyPlan()

**File:** `src/hooks/useStudyPlan.js`
```javascript
const { plan, loading, generatePlan, clearPlan } = useStudyPlan();
```

### useResume()

**File:** `src/hooks/useResume.js`
```javascript
const { score, loading, analyzeResume, clearScore } = useResume();
```

### useMood()

**File:** `src/hooks/useMood.js`
```javascript
const { moodData, trackMood, selectMood } = useMood();
```

## Error Handling

All API calls include try-catch blocks with fallback data:
```javascript
try {
  const result = await apiCall();
  return result;
} catch (error) {
  console.error('API Error:', error);
  return fallbackData;
}
```

## Rate Limiting

- The API has rate limits
- Implement debouncing for frequent calls
- Cache responses when possible

## Best Practices

1. Always handle errors gracefully
2. Show loading states to users
3. Provide fallback data for demos
4. Use environment variables for API keys
5. Never expose API keys in client code