import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../../model';
import { useLogin } from '../use-login-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import * as authApi from '../../api/auth-api';

const mockNavigate = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../api/auth-api', () => ({
  login: jest.fn(),
  getAuthToken: jest.fn(),
  getAuthUser: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();

    useAuthStore.setState({
      isLoading: false,
      error: null,
      isAuthenticated: false,
      user: null,
      token: null,
    });
  });

  it('should initialize with default values and states', () => {
    const { result } = renderHook(() => useLogin(), { wrapper });

    expect(result.current.form.getValues()).toEqual({
      email: '',
      password: '',
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.showPassword).toBe(false);
  });

  it('should call login and navigate on successful submission', async () => {
    (authApi.login as jest.Mock).mockResolvedValueOnce({
      user: { id: '1', email: 'test@example.com', name: 'Test' },
      token: 'token123',
    });

    const { result } = renderHook(() => useLogin(), { wrapper });

    const testValues = { email: 'test@example.com', password: 'password123' };

    await act(async () => {
      await result.current.handleLoginSubmit(testValues);
    });

    expect(authApi.login).toHaveBeenCalledWith(testValues);
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/shelf' });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it('should handle login failure gracefully', async () => {
    const loginError = new Error('Invalid credentials');
    (authApi.login as jest.Mock).mockRejectedValueOnce(loginError);

    const { result } = renderHook(() => useLogin(), { wrapper });

    const testValues = { email: 'wrong@example.com', password: 'wrong' };

    await act(async () => {
      await result.current.handleLoginSubmit(testValues);
    });

    expect(authApi.login).toHaveBeenCalledWith(testValues);
    expect(mockNavigate).not.toHaveBeenCalled();
    // In auth-store.ts, the error is err.message
    expect(useAuthStore.getState().error).toBe('Invalid credentials');
    expect(result.current.error).toBe('Invalid credentials');
  });

  it('should toggle showPassword state', () => {
    const { result } = renderHook(() => useLogin(), { wrapper });

    expect(result.current.showPassword).toBe(false);

    act(() => {
      result.current.setShowPassword(true);
    });
    expect(result.current.showPassword).toBe(true);

    act(() => {
      result.current.setShowPassword(false);
    });
    expect(result.current.showPassword).toBe(false);
  });
});
