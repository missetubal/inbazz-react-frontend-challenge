import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../types';

const simulateNetworkDelay = (ms?: number) =>
  new Promise((resolve) => setTimeout(resolve, ms ?? 2000));

export async function login({
  email,
  password,
}: LoginRequest): Promise<AuthResponse> {
  await simulateNetworkDelay(1000);

  if (email === 'test@example.com' && password === 'password123') {
    const user: User = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Michelle Teste',
    };
    const token = 'fake-jwt-token-123';
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
    return { user, token };
  } else {
    throw new Error('Credenciais inválidas.');
  }
}

export async function register({
  email,
  name,
}: RegisterRequest): Promise<AuthResponse> {
  await simulateNetworkDelay(1500);

  const user: User = {
    id: `user-${Date.now()}`,
    email,
    name,
  };
  const token = `fake-jwt-token-${Date.now()}`;
  localStorage.setItem('authToken', token);
  localStorage.setItem('authUser', JSON.stringify(user));
  return { user, token };
}

export async function logout(): Promise<void> {
  await simulateNetworkDelay(500);
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
}

export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

export function getAuthUser(): User | null {
  const userString = localStorage.getItem('authUser');
  return userString ? JSON.parse(userString) : null;
}
