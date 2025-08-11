// Input.tsx
import React from 'react'

type StringState = Record<string, string>

type InputProps<T extends StringState, K extends keyof T> = {
  name: K
  label: string
  state: T
  setState: React.Dispatch<React.SetStateAction<T>>
}

export function Input<T extends StringState, K extends keyof T>({ name, label, state, setState }: InputProps<T, K>) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={String(name)}>{label}</label>
      <br />
      <input
        type="text"
        id={String(name)}
        name={String(name)}
        value={state[name]}
        onChange={(e) => {
          const v = e.target.value
          setState((prev) => ({ ...prev, [name]: v }))
        }}
      />
    </div>
  )
}
