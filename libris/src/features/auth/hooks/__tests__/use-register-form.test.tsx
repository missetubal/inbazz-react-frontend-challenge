import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '../../model';
import { useRegisterForm } from '../use-register-form';
import * as authApi from '../../api/auth-api';
import type { RegisterSchema } from '../../schemas';
import { toast } from 'sonner';

const mockNavigate = jest.fn();
jest.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../../api/auth-api', () => ({
  login: jest.fn(),
  getAuthToken: jest.fn(),
  getAuthUser: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useRegisterForm', () => {
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
    const { result } = renderHook(() => useRegisterForm(), { wrapper });

    expect(result.current.form.getValues()).toEqual({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.showPassword).toBe(false);
    expect(result.current.showConfirmPassword).toBe(false);
  });

  it('should call register and navigate on successful submission', async () => {
    (authApi.register as jest.Mock).mockResolvedValueOnce({
      user: { id: '2', name: 'New User', email: 'new@example.com' },
      token: 'newtoken456',
    });

    const { result } = renderHook(() => useRegisterForm(), { wrapper });

    const testValues: RegisterSchema = {
      name: 'New User',
      email: 'new@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    await act(async () => {
      await result.current.handleRegisterSubmit(testValues);
    });

    expect(authApi.register).toHaveBeenCalledWith({
      name: 'New User',
      email: 'new@example.com',
      password: 'password123',
    });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().user).toEqual({
      id: '2',
      name: 'New User',
      email: 'new@example.com',
    });
    expect(useAuthStore.getState().token).toBe('newtoken456');
  });

  it('should handle registration failure and show error toast', async () => {
    const registerError = new Error('Email already in use');
    (authApi.register as jest.Mock).mockRejectedValueOnce(registerError);

    const { result } = renderHook(() => useRegisterForm(), { wrapper });

    const testValues: RegisterSchema = {
      name: 'Fail User',
      email: 'fail@example.com',
      password: 'wrong',
      confirmPassword: 'wrong',
    };

    await act(async () => {
      await result.current.handleRegisterSubmit(testValues);
    });

    expect(authApi.register).toHaveBeenCalledWith({
      name: 'Fail User',
      email: 'fail@example.com',
      password: 'wrong',
    });
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(useAuthStore.getState().error).toBe('Email already in use');
    expect(result.current.error).toBe('Email already in use');
    expect(toast.error).toHaveBeenCalledWith('register.error');
  });

  it('should toggle showPassword state', () => {
    const { result } = renderHook(() => useRegisterForm(), { wrapper });

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

  it('should toggle showConfirmPassword state', () => {
    const { result } = renderHook(() => useRegisterForm(), { wrapper });

    expect(result.current.showConfirmPassword).toBe(false);

    act(() => {
      result.current.setShowConfirmPassword(true);
    });
    expect(result.current.showConfirmPassword).toBe(true);

    act(() => {
      result.current.setShowConfirmPassword(false);
    });
    expect(result.current.showConfirmPassword).toBe(false);
  });
});
