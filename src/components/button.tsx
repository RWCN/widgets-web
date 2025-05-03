import type { Component, ParentProps } from 'solid-js'
import { clsx } from 'clsx'
import type { MaybePromise, StyleProps } from '../types.ts'
import style from './button.module.css'

export type Props = {
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => MaybePromise<void>
} & StyleProps &
  ParentProps

export const Button: Component<Props> = props => {
  return (
    <button
      class={clsx(props.class, 'rwcn-btn', 'rwcn-widget', style['btn'])}
      classList={props.classList}
      style={props.style}
      type={props.type || 'button'}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
