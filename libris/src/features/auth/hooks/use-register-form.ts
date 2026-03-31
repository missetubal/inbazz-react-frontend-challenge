import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../model';
import { useForm } from 'react-hook-form';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { createRegisterSchema, type RegisterSchema } from '../schemas';
import { toast } from 'sonner';

interface UseRegisterFormResult {
  form: ReturnType<typeof useForm<RegisterSchema>>;
  handleRegisterSubmit: (formValues: RegisterSchema) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  showConfirmPassword: boolean;
  setShowConfirmPassword: Dispatch<SetStateAction<boolean>>;
}

export function useRegisterForm(): UseRegisterFormResult {
  const { t } = useTranslation('auth');
  const { register, isLoading, error, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(createRegisterSchema(t)),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleLoginSubmit = async (formValues: RegisterSchema) => {
    try {
      await register(formValues);
      if (isAuthenticated) navigate({ to: '/' });
    } catch {
      toast.error(t('register.error'));
    }
  };

  return {
    form,
    isLoading,
    error,
    showPassword,
    showConfirmPassword,
    handleRegisterSubmit: handleLoginSubmit,
    setShowPassword,
    setShowConfirmPassword,
  };
}
