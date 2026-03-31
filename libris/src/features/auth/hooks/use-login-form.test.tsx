import { renderHook, act } from '@testing-library/react';
import { useLogin } from './use-login-form';
import { useAuthStore } from '../model';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

jest.mock('@tanstack/react-router', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('../model', () => ({
  useAuthStore: jest.fn(),
}));

const mockNavigate = useNavigate as jest.Mock;
const mockUseTranslation = useTranslation as jest.Mock;
const mockUseAuthStore = useAuthStore as jest.MockedFunction<
  typeof useAuthStore
>;

describe('useLogin', () => {
  let navigate: jest.Mock;
  let login: jest.Mock;

  beforeEach(() => {
    navigate = jest.fn();
    login = jest.fn();
    mockNavigate.mockReturnValue(navigate);
    mockUseTranslation.mockReturnValue({ t: (key: string) => key });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial values correctly', () => {
    mockUseAuthStore.mockReturnValue({
      login,
      isLoading: false,
      error: null,
      isAuthenticated: false,
    });

    const { result } = renderHook(() => useLogin());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.showPassword).toBe(false);
    expect(result.current.form).toBeDefined();
  });

  it('should toggle showPassword', () => {
    mockUseAuthStore.mockReturnValue({
      login,
      isLoading: false,
      error: null,
      isAuthenticated: false,
    });

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setShowPassword(true);
    });

    expect(result.current.showPassword).toBe(true);

    act(() => {
      result.current.setShowPassword(false);
    });

    expect(result.current.showPassword).toBe(false);
  });

  it('should call login and navigate on successful submission', async () => {
    mockUseAuthStore.mockReturnValue({
      login,
      isLoading: false,
      error: null,
      isAuthenticated: true, // Simulate being authenticated after login
    });

    const { result } = renderHook(() => useLogin());
    const formValues = { email: 'test@example.com', password: 'password123' };

    await act(async () => {
      await result.current.handleLoginSubmit(formValues);
    });

    expect(login).toHaveBeenCalledWith(formValues);
    expect(navigate).toHaveBeenCalledWith({ to: '/' });
  });

  it('should call login but not navigate on failed submission', async () => {
    login.mockRejectedValue(new Error('Login failed'));
    mockUseAuthStore.mockReturnValue({
      login,
      isLoading: false,
      error: 'Invalid credentials',
      isAuthenticated: false,
    });

    const { result } = renderHook(() => useLogin());
    const formValues = { email: 'test@example.com', password: 'wrongpassword' };

    await act(async () => {
      await result.current.handleLoginSubmit(formValues);
    });

    expect(login).toHaveBeenCalledWith(formValues);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should reflect loading state from the store', () => {
    mockUseAuthStore.mockReturnValue({
      login,
      isLoading: true,
      error: null,
      isAuthenticated: false,
    });

    const { result } = renderHook(() => useLogin());

    expect(result.current.isLoading).toBe(true);
  });

  it('should reflect error state from the store', () => {
    const errorMessage = 'Something went wrong';
    mockUseAuthStore.mockReturnValue({
      login,
      isLoading: false,
      error: errorMessage,
      isAuthenticated: false,
    });

    const { result } = renderHook(() => useLogin());

    expect(result.current.error).toBe(errorMessage);
  });
});
