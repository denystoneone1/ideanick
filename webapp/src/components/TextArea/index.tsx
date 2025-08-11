// src/components/TextArea.tsx
import type { FormikProps } from 'formik'

type StringKeys<T> = { [K in keyof T]-?: T[K] extends string ? K : never }[keyof T]

type TextAreaProps<T extends Record<string, unknown>, K extends StringKeys<T>> = {
  name: K
  label: string
  formik: FormikProps<T>
  rows?: number
  placeholder?: string
}

export function TextArea<T extends Record<string, unknown>, K extends StringKeys<T>>({
  name,
  label,
  formik,
  rows = 4,
  placeholder,
}: TextAreaProps<T, K>) {
  const id = String(name) // ← строковый ключ
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={id}>{label}</label>
      <br />
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={(value as string) ?? ''}
        onChange={formik.handleChange}
        onBlur={() => {
          void formik.setFieldTouched(id, true, true) // ← передаём string
        }}
        placeholder={placeholder}
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
