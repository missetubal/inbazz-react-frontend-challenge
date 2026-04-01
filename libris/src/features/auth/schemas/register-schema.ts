import type { TFunction } from 'i18next';
import z from 'zod';

export const createRegisterSchema = (t: TFunction) => {
  return z
    .object({
      name: z
        .string()
        .min(1, t('registerPage.registerForm.name.errors.required')),
      email: z
        .email(t('registerPage.registerForm.email.errors.required'))
        .min(1, t('registerPage.registerForm.email.errors.required')),
      password: z
        .string()
        .min(1, t('registerPage.registerForm.password.errors.required'))
        .min(6, t('registerPage.registerForm.password.errors.minLength'))
        .regex(
          /[A-Z]/,
          t('registerPage.registerForm.password.errors.upperCase'),
        )
        .regex(
          /[a-z]/,
          t('registerPage.registerForm.password.errors.lowerCase'),
        )
        .regex(
          /[0-9]/,
          t('registerPage.registerForm.password.errors.numberRequired'),
        )
        .regex(
          /[^a-zA-Z0-9]/,
          t('registerPage.registerForm.password.errors.specialChar'),
        ),
      confirmPassword: z
        .string()
        .min(1, t('registerPage.registerForm.confirmPassword.errors.required')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('registerPage.registerForm.confirmPassword.errors.dontMatch'),
      path: ['confirmPassword'],
    });
};

export type RegisterSchema = z.infer<ReturnType<typeof createRegisterSchema>>;
