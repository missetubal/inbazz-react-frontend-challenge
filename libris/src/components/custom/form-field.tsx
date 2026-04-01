import { useFormContext } from 'react-hook-form';
import type { InputProps } from '@base-ui/react/input';
import { InputGroup, InputGroupAddon, InputGroupInput, Label } from '../ui';
import type { ReactElement } from 'react';

interface FormFieldProps extends InputProps {
  label?: string;
  name: string;
  labelClassName?: string;
  inputClassName?: string;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  onClickRightIcon?: () => void;
  onClickLeftIcon?: () => void;
}

export function FormField({
  label,
  labelClassName,
  inputClassName,
  name,
  rightIcon,
  leftIcon,
  onClickLeftIcon,
  onClickRightIcon,
  ...props
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];

  return (
    <div className={`space-y-4 ${props.className || ''}`}>
      <Label
        htmlFor={name}
        className={`text-sm font-medium ${labelClassName || ''}`}
      >
        {label}
      </Label>
      <InputGroup>
        <InputGroupInput
          id={name}
          type={props.type}
          placeholder={props.placeholder ?? undefined}
          {...register(name)}
          className={`h-12 bg-secondary/50 ${inputClassName || ''}`}
        />

        {rightIcon && (
          <InputGroupAddon onClick={onClickRightIcon} align='inline-end'>
            {rightIcon}
          </InputGroupAddon>
        )}

        {leftIcon && (
          <InputGroupAddon onClick={onClickLeftIcon} align='inline-start'>
            {leftIcon}
          </InputGroupAddon>
        )}
      </InputGroup>
      {fieldError && (
        <p className='text-destructive text-xs mt-1'>
          {fieldError.message as string}
        </p>
      )}
    </div>
  );
}
