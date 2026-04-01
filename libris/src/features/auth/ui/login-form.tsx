import { useTranslation } from 'react-i18next';
import { useLogin } from '../hooks';
import { FormProvider } from 'react-hook-form';
import { FormField } from '@/components/custom';
import { Button } from '@/components/ui';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export const LoginForm = () => {
  const { t } = useTranslation('auth');
  const { form, handleLoginSubmit, showPassword, isLoading, setShowPassword } =
    useLogin();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleLoginSubmit)}
        className='space-y-6'
      >
        <FormField
          type='email'
          name='email'
          label={t('loginPage.loginForm.email.label')}
          placeholder={t('loginPage.loginForm.email.placeholder')}
          inputClassName='h-12 bg-secondary/50 pr-12'
        />

        <FormField
          type={showPassword ? 'text' : 'password'}
          name='password'
          label={t('loginPage.loginForm.password.label')}
          placeholder={t('loginPage.loginForm.password.placeholder')}
          rightIcon={showPassword ? <EyeOff /> : <Eye />}
          onClickRightIcon={() => setShowPassword(!showPassword)}
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
            t('loginPage.loginForm.submit')
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
