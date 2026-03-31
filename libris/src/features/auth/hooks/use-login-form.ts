import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../model';
import { createLoginSchema, type LoginSchema } from '../schemas/login-schema';
import { useForm } from 'react-hook-form';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface UseLoginResult {
  form: ReturnType<typeof useForm<LoginSchema>>;
  handleLoginSubmit: (formValues: LoginSchema) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}

export function useLogin(): UseLoginResult {
  const { t } = useTranslation('auth');
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(createLoginSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLoginSubmit = async (formValues: LoginSchema) => {
    try {
      await login(formValues);
      if (useAuthStore.getState().isAuthenticated) {
        navigate({ to: '/' });
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return {
    form,
    handleLoginSubmit,
    isLoading,
    error,
    showPassword,
    setShowPassword,
  };
}
