import { z } from 'zod'

const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().min(1, 'Missing Firebase API Key'),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1, 'Missing Firebase Auth Domain'),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1, 'Missing Firebase Project ID'),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1, 'Missing Firebase Storage Bucket'),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, 'Missing Firebase Messaging Sender ID'),
  VITE_FIREBASE_APP_ID: z.string().min(1, 'Missing Firebase App ID'),
})

const getEnv = () => {
  const result = envSchema.safeParse({
    VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || 'placeholder',
    VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'placeholder',
    VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'placeholder',
    VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'placeholder',
    VITE_FIREBASE_MESSAGING_SENDER_ID:
      import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'placeholder',
    VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID || 'placeholder',
  })

  if (!result.success) {
    console.warn('⚠️ Invalid environment variables:', result.error.format())
    return {
      VITE_FIREBASE_API_KEY: 'placeholder',
      VITE_FIREBASE_AUTH_DOMAIN: 'placeholder',
      VITE_FIREBASE_PROJECT_ID: 'placeholder',
      VITE_FIREBASE_STORAGE_BUCKET: 'placeholder',
      VITE_FIREBASE_MESSAGING_SENDER_ID: 'placeholder',
      VITE_FIREBASE_APP_ID: 'placeholder',
    }
  }

  return result.data
}

export const env = getEnv()
