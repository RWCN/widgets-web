import style from './text-input.module.css'

import { Component } from 'solid-js'
import { useField } from '@gapu/formix'
import clsx from 'clsx'
import { StyleProps } from '../types.ts'

export type TextInputProps = {
  disabled?: boolean
  placeholder?: string
  onInput?: (value: string) => void
  onFocus?: () => void
  value?: string
} & StyleProps

export const TextInput: Component<TextInputProps> = props => {
  return (
    <input
      class={clsx(
        props.class,
        'rwcn-text-input',
        'rwcn-widget',
        style['text-input']
      )}
      classList={props.classList}
      style={props.style}
      type='text'
      disabled={props.disabled}
      placeholder={props.placeholder}
      onInput={ev => props.onInput?.(ev.target.value)}
      value={props.value || ''}
    />
  )
}

export type TextFieldProps = {
  name: string
} & StyleProps

export const TextField: Component<TextFieldProps> = props => {
  const field = useField<string>(props.name)

  return (
    <TextInput
      class={clsx(props.class, 'rwcn-text-field', style['text-field'])}
      classList={props.classList}
      style={props.style}
      value={field.value()}
      onInput={v => field.setValue(v)}
      onFocus={() => field.setMeta(prev => ({ ...prev, touched: true }))}
      disabled={field.meta().disabled}
    />
  )
}
