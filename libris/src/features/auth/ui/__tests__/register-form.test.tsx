import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegisterForm } from '../register-form';
import { useRegisterForm } from '../../hooks';
import { FormField } from '@/components/custom';

jest.mock('../../hooks', () => ({
  useRegisterForm: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string) => key,
  })),
}));

jest.mock('@/components/custom', () => ({
  FormField: jest.fn(() => <input data-testid='form-field' />),
}));

jest.mock('@/components/ui', () => ({
  Button: jest.fn(({ children, disabled, type, className, ...props }) => (
    <button
      data-testid='submit-btn'
      disabled={disabled}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </button>
  )),
}));

jest.mock('lucide-react', () => ({
  Eye: () => <span data-testid='eye' />,
  EyeOff: () => <span data-testid='eye-off' />,
  Loader2: () => <span data-testid='loader' />,
}));

const mockUseRegisterForm = {
  form: {
    handleSubmit: jest.fn((fn) => fn),
    getValues: jest.fn(() => ({})),
  },
  handleRegisterSubmit: jest.fn(),
  isLoading: false,
  showPassword: false,
  showConfirmPassword: false,
  setShowPassword: jest.fn(),
  setShowConfirmPassword: jest.fn(),
};

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRegisterForm as jest.Mock).mockReturnValue(mockUseRegisterForm);
    (FormField as jest.Mock).mockImplementation(
      ({ name, type, label, onClickRightIcon }) => (
        <div data-testid={`form-field-${name}`}>
          <label>{label}</label>
          <input type={type} />
          {onClickRightIcon && (
            <button onClick={onClickRightIcon}>Toggle</button>
          )}
        </div>
      ),
    );
  });

  it('renders form fields correctly', () => {
    render(<RegisterForm />);

    expect(screen.getByTestId('form-field-name')).toBeInTheDocument();
    expect(screen.getByTestId('form-field-email')).toBeInTheDocument();
    expect(screen.getByTestId('form-field-password')).toBeInTheDocument();
    expect(
      screen.getByTestId('form-field-confirmPassword'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
    expect(
      screen.getByText('registerPage.registerForm.submit'),
    ).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    render(<RegisterForm />);

    const passwordToggle = screen
      .getByTestId('form-field-password')
      .querySelector('button');
    fireEvent.click(passwordToggle!);

    expect(mockUseRegisterForm.setShowPassword).toHaveBeenCalledWith(true);
  });

  it('toggles confirm password visibility', async () => {
    render(<RegisterForm />);

    const confirmToggle = screen
      .getByTestId('form-field-confirmPassword')
      .querySelector('button');
    fireEvent.click(confirmToggle!);

    expect(mockUseRegisterForm.setShowConfirmPassword).toHaveBeenCalledWith(
      true,
    );
  });

  it('submits form when button clicked', async () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => {
      expect(mockUseRegisterForm.form.handleSubmit).toHaveBeenCalled();
      expect(mockUseRegisterForm.handleRegisterSubmit).toHaveBeenCalled();
    });
  });

  it('shows loading state', () => {
    (useRegisterForm as jest.Mock).mockReturnValue({
      ...mockUseRegisterForm,
      isLoading: true,
    });

    render(<RegisterForm />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
  });
});
