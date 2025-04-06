// src/hooks/useForm.ts
'use client';
import { useState } from 'react';

type FormValues = Record<string, unknown>;
type FormErrors = Record<string, string>;
type FormTouched = Record<string, boolean>;
type ValidateFunction<T extends FormValues> = (values: T) => FormErrors;

interface UseFormReturn<T extends FormValues> {
  values: T;
  errors: FormErrors;
  touched: FormTouched;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    e: React.FormEvent,
    onSubmit: (values: T) => void | Promise<void>
  ) => void;
  isSubmitting: boolean;
}

function useForm<T extends FormValues>(
  initialValues: T,
  validate?: ValidateFunction<T>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (validate) {
      setErrors(validate(values));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (values: T) => void | Promise<void>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      setTouched(
        Object.keys(values).reduce<FormTouched>((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );

      if (Object.keys(validationErrors).length > 0) {
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
}

export default useForm;
