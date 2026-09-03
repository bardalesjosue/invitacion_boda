import { signInWithEmailAndPassword, type Auth } from 'firebase/auth'
import { auth } from '@/config/firebase'

const FRIENDLY_ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Credenciales incorrectas. Por favor verifica tu correo y contraseña.',
  'auth/wrong-password': 'Credenciales incorrectas. Por favor verifica tu correo y contraseña.',
  'auth/user-not-found': 'Credenciales incorrectas. Por favor verifica tu correo y contraseña.',
  'auth/invalid-email': 'El formato del correo electrónico no es válido.',
}

/**
 * Wraps Firebase Auth so pages depend on this abstraction rather than the
 * Firebase SDK directly (DIP), and keeps error-message mapping out of components (SRP).
 */
export function createAuthService(authInstance: Auth = auth) {
  return {
    async signIn(email: string, password: string): Promise<void> {
      try {
        await signInWithEmailAndPassword(authInstance, email, password)
      } catch (err) {
        console.error('Error logging in:', err)
        const code = err instanceof Object && 'code' in err ? String(err.code) : ''
        throw new Error(FRIENDLY_ERROR_MESSAGES[code] || 'Ocurrió un error al iniciar sesión.', {
          cause: err,
        })
      }
    },
  }
}

export const AuthService = createAuthService()
