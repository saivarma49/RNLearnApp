// ============================================================
// AI Service - OpenAI API Integration
// ============================================================
import axios, { AxiosError, AxiosInstance } from 'axios';
import { AIResponse, QuizQuestion, Difficulty } from '../types';

const BASE_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o-mini';

const DEFAULT_API_KEY = '';
let currentApiKey = DEFAULT_API_KEY;
let apiClient: AxiosInstance = createClient(DEFAULT_API_KEY);

function createClient(apiKey: string): AxiosInstance {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    timeout: 30000,
  });
}

export function setApiKey(key: string) {
  currentApiKey = key;
  apiClient = createClient(key);
}

export function getApiKey(): string {
  return currentApiKey;
}

export function isApiKeyConfigured(): boolean {
  return currentApiKey.trim().length > 0;
}

function getErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<any>;
  const responseData = axiosError.response?.data;
  const errorMessage = responseData?.error?.message || '';

  if (axiosError.response?.status === 401) {
    return 'Invalid API key. Please go to Profile and update your OpenAI API key.';
  }
  if (axiosError.response?.status === 429) {
    // OpenAI returns 429 for both rate limits AND insufficient quota/credits
    if (errorMessage.toLowerCase().includes('quota') || errorMessage.toLowerCase().includes('billing')) {
      return 'Your OpenAI account has no credits. Please go to platform.openai.com/settings/organization/billing to add credits, then try again.';
    }
    if (errorMessage.toLowerCase().includes('rate limit')) {
      return 'Rate limit exceeded. Please wait a moment and try again.';
    }
    // Fallback — show the actual OpenAI error if available
    return errorMessage || 'Your OpenAI API request was rejected (429). This usually means your account has no credits. Please check your billing at platform.openai.com.';
  }
  if (axiosError.response?.status === 403) {
    return 'API key does not have permission. Please check your OpenAI API key permissions.';
  }
  if (axiosError.response?.status === 404) {
    return 'API endpoint not found. The model may not be available for your API key.';
  }
  if (axiosError.code === 'ECONNABORTED') {
    return 'Request timed out. Please check your internet connection and try again.';
  }
  if (axiosError.message?.includes('Network Error')) {
    return 'Network error. Please check your internet connection.';
  }
  return axiosError.message || 'An error occurred while contacting the AI service.';
}

async function callAI(prompt: string, systemPrompt?: string): Promise<AIResponse> {
  if (!isApiKeyConfigured()) {
    return { content: '', error: 'No API key configured. Please go to Profile and add your OpenAI API key.' };
  }

  try {
    const messages = [
      {
        role: 'system' as const,
        content:
          systemPrompt ||
          'You are an expert programming tutor specializing in React Native and JavaScript. Provide clear, concise, and accurate explanations with practical examples.',
      },
      { role: 'user' as const, content: prompt },
    ];

    const response = await apiClient.post('', {
      model: MODEL,
      messages,
      max_tokens: 1500,
      temperature: 0.7,
    });

    return {
      content: response.data.choices[0].message.content.trim(),
    };
  } catch (error) {
    return { content: '', error: getErrorMessage(error) };
  }
}

// ---- Public API Functions ----

export async function generateDefinition(topic: string): Promise<AIResponse> {
  return callAI(
    `Explain "${topic}" in the context of React Native / JavaScript development. Include:
1. A clear definition (2-3 sentences)
2. Why it matters in real-world development
3. When to use it vs alternatives

Keep it concise and practical.`,
  );
}

export async function generateExample(topic: string): Promise<AIResponse> {
  return callAI(
    `Provide a complete, production-quality code example for "${topic}" in React Native.

Requirements:
- Include all necessary imports
- Add inline comments explaining key parts
- Show a realistic use case, not a toy example
- Include proper TypeScript types
- Format with proper indentation`,
  );
}

export async function generateQuiz(
  topic: string,
  difficulty: Difficulty = 'Intermediate',
): Promise<QuizQuestion[]> {
  const response = await callAI(
    `Generate 5 quiz questions about "${topic}" at ${difficulty} difficulty level.

Return a valid JSON array with this exact structure:
[
  {
    "type": "mcq",
    "question": "question text",
    "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
    "correctAnswer": "A) option1",
    "explanation": "Why this is correct"
  }
]

Mix question types:
- 2 MCQ (conceptual)
- 1 output-based (what does this code output?)
- 1 coding (what's wrong with this code?)
- 1 scenario-based (which approach would you use?)

Return ONLY valid JSON, no markdown.`,
    'You are a programming quiz generator. Return only valid JSON arrays.',
  );

  if (response.error) {
    return [];
  }

  try {
    const parsed = JSON.parse(response.content);
    return parsed.map((q: any, index: number) => ({
      id: `quiz_${Date.now()}_${index}`,
      type: q.type || 'mcq',
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      topicId: topic,
      difficulty,
    }));
  } catch {
    return [];
  }
}

export async function explainLikeFive(topic: string): Promise<AIResponse> {
  return callAI(
    `Explain "${topic}" like I'm 5 years old. Use a fun real-world analogy that a child would understand. Then briefly connect it back to programming.

Format:
**Analogy:** [fun analogy]
**In Programming:** [1-2 sentence technical connection]`,
  );
}

export async function generateInterviewQuestions(topic: string): Promise<AIResponse> {
  return callAI(
    `Generate 5 common interview questions about "${topic}" for React Native / JavaScript developer roles.

For each question provide:
1. The question
2. A concise model answer (3-4 sentences)
3. A follow-up question the interviewer might ask

Format each as a numbered list.`,
  );
}

export async function generateAdvancedVersion(topic: string): Promise<AIResponse> {
  return callAI(
    `Provide an advanced deep-dive into "${topic}" for experienced React Native developers.

Cover:
1. Internal implementation details
2. Edge cases and gotchas
3. Performance implications
4. Advanced patterns and techniques
5. Real-world production tips

Be technical and specific.`,
  );
}

export async function chatWithAI(
  message: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
): Promise<AIResponse> {
  if (!isApiKeyConfigured()) {
    return { content: '', error: 'No API key configured. Please go to Profile and add your OpenAI API key.' };
  }

  try {
    const messages = [
      {
        role: 'system' as const,
        content: `You are an expert AI coding tutor in the "RN Smart AI Learning Hub" app. You specialize in:
- React Native development
- JavaScript / TypeScript
- Mobile app architecture
- Debugging and performance optimization
- Interview preparation

Be helpful, concise, and provide code examples when relevant. Format responses with markdown.`,
      },
      ...conversationHistory.slice(-10).map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user' as const, content: message },
    ];

    const response = await apiClient.post('', {
      model: MODEL,
      messages,
      max_tokens: 2000,
      temperature: 0.7,
    });

    return {
      content: response.data.choices[0].message.content.trim(),
    };
  } catch (error) {
    return { content: '', error: getErrorMessage(error) };
  }
}

export async function debugCode(code: string, errorMessage: string): Promise<AIResponse> {
  return callAI(
    `Debug this React Native / JavaScript code:

\`\`\`
${code}
\`\`\`

Error: ${errorMessage}

Provide:
1. What's causing the error
2. The fix with corrected code
3. How to prevent this in the future`,
  );
}

export async function convertJSToRN(jsCode: string): Promise<AIResponse> {
  return callAI(
    `Convert this JavaScript/web code to a React Native equivalent:

\`\`\`
${jsCode}
\`\`\`

Provide:
1. The React Native equivalent code
2. Key differences explained
3. Any React Native specific considerations`,
  );
}

export async function getDailyChallenge(): Promise<AIResponse> {
  const topics = [
    'FlatList optimization',
    'Custom hooks',
    'React Navigation deep linking',
    'Async/Await error handling',
    'useMemo vs useCallback',
    'Context API performance',
    'React Native animations',
    'TypeScript generics',
    'Promise.all patterns',
    'State management patterns',
  ];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  return callAI(
    `Create a daily coding challenge about "${randomTopic}".

Format:
**Challenge:** [description]
**Difficulty:** [Beginner/Intermediate/Advanced]
**Requirements:** [bullet points]
**Hint:** [a helpful hint without giving away the answer]
**Bonus:** [extra credit challenge]`,
  );
}
