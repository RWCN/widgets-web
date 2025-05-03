import { Component, ParentProps } from 'solid-js'
import { StyleProps } from '../types.ts'
import style from './text.module.css'
import { Inline } from './layout.tsx'
import clsx from 'clsx'
import { Property } from 'csstype'

export type TextProps = {
  font?: Property.Font
  fontSize?: Property.FontSize
  fontWeight?: Property.FontWeight
} & StyleProps &
  ParentProps

export const Text: Component<TextProps> = props => {
  return (
    <Inline
      {...props}
      class={clsx(props.class, 'rwcn-text', style['text'])}
      style={{
        ...props.style,
        font: props.font,
        'font-weight': props.fontWeight,
        'font-size': props.fontSize,
      }}
    />
  )
}

export const Paragraph: Component<TextProps> = props => {
  return (
    <p
      {...props}
      class={clsx(
        props.class,
        'rwcn-paragraph',
        'rwcn-widget',
        style['paragraph']
      )}
      style={{
        ...props.style,
        font: props.font,
        'font-weight': props.fontWeight,
        'font-size': props.fontSize,
      }}
    />
  )
}
