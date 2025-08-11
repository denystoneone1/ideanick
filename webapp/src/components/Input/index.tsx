// src/components/Input.tsx
import React from 'react'
import type { FormikProps } from 'formik'

type StringKeys<T> = { [K in keyof T]-?: T[K] extends string ? K : never }[keyof T]

type InputProps<T extends Record<string, unknown>, K extends StringKeys<T>> = {
  name: K
  label: string
  formik: FormikProps<T>
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  autoComplete?: string
}

export function Input<T extends Record<string, unknown>, K extends StringKeys<T>>({
  name,
  label,
  formik,
  type = 'text',
  placeholder,
  autoComplete,
}: InputProps<T, K>) {
  const id = String(name) // ← строковый ключ для DOM и Formik API, где нужен string
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        id={id}
        name={id}
        type={type}
        value={(value as string) ?? ''}
        onChange={formik.handleChange}
        onBlur={() => {
          void formik.setFieldTouched(id, true, true) // ← передаём string
        }}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={
          touched && error
            ? { borderColor: 'crimson', borderWidth: 1, borderStyle: 'solid', outline: 'none' }
            : undefined
        }
      />
      {!!touched && !!error && <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{error}</div>}
    </div>
  )
}
