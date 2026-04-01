import type { TFunction } from 'i18next';
import z from 'zod';

export const createLoginSchema = (t: TFunction) => {
  return z.object({
    email: z
      .email(t('loginPage.loginForm.email.errors.required'))
      .min(1, t('loginPage.loginForm.email.errors.required')),
    password: z
      .string()
      .min(1, t('loginPage.loginForm.password.errors.required'))
      .min(6, t('loginPage.loginForm.password.errors.minLength')),
  });
};

export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>;
