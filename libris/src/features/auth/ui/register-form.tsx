import { useTranslation } from 'react-i18next';
import { useLogin, useRegisterForm } from '../hooks';
import { FormProvider } from 'react-hook-form';
import { FormField } from '@/components/custom';
import { Button } from '@/components/ui';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export const RegisterForm = () => {
  const { t } = useTranslation('auth');
  const {
    form,
    handleRegisterSubmit,
    showConfirmPassword,
    setShowConfirmPassword,
    showPassword,
    isLoading,
    setShowPassword,
  } = useRegisterForm();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegisterSubmit)}
        className='space-y-6'
      >
        <FormField
          type='text'
          name='name'
          label={t('registerPage.registerForm.name.label')}
          placeholder={t('registerPage.registerForm.name.placeholder')}
          inputClassName='h-12 bg-secondary/50 pr-12'
        />
        <FormField
          type='email'
          name='email'
          label={t('registerPage.registerForm.email.label')}
          placeholder={t('registerPage.registerForm.email.placeholder')}
          inputClassName='h-12 bg-secondary/50 pr-12'
        />
        <FormField
          type={showPassword ? 'text' : 'password'}
          name='password'
          label={t('registerPage.registerForm.password.label')}
          placeholder={t('registerPage.registerForm.password.placeholder')}
          rightIcon={showPassword ? <EyeOff /> : <Eye />}
          onClickRightIcon={() => setShowPassword(!showPassword)}
          inputClassName='h-12 bg-secondary/50 pr-12'
        />
        <FormField
          type={showConfirmPassword ? 'text' : 'password'}
          name='confirmPassword'
          label={t('registerPage.registerForm.confirmPassword.label')}
          placeholder={t(
            'registerPage.registerForm.confirmPassword.placeholder',
          )}
          rightIcon={showConfirmPassword ? <EyeOff /> : <Eye />}
          onClickRightIcon={() => setShowConfirmPassword(!showConfirmPassword)}
          inputClassName='h-12 bg-secondary/50 pr-12'
        />
        <Button
          type='submit'
          disabled={isLoading}
          className='w-full h-12 text-base font-semibold'
        >
          {isLoading ? (
            <Loader2 className='w-5 h-5 animate-spin' />
          ) : (
            t('registerPage.registerForm.submit')
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
