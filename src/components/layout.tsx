import { Component, ParentProps } from 'solid-js'
import { StyleProps } from '../types.ts'
import style from './layout.module.css'
import clsx from 'clsx'
import { Property } from 'csstype'

export type RowProps = {
  reverse?: boolean
  gap?: Property.RowGap
} & StyleProps &
  ParentProps

export const Row: Component<RowProps> = props => {
  return (
    <Box
      class={clsx(props.class, 'rwcn-layout-row', style['row'])}
      classList={{
        ...props.classList,
        [style['reverse']]: props.reverse,
      }}
      style={{
        ...props.style,
        'row-gap': props.gap,
      }}
    >
      {props.children}
    </Box>
  )
}

export const Col: Component<RowProps> = props => {
  return (
    <Box
      class={clsx(props.class, 'rwcn-layout-col', style['col'])}
      classList={{
        ...props.classList,
        [style['reverse']]: props.reverse,
      }}
      style={{
        ...props.style,
        'row-gap': props.gap,
      }}
    >
      {props.children}
    </Box>
  )
}

export type BoxProps = {
  padding?: Property.Padding
} & StyleProps &
  ParentProps

export const Box: Component<BoxProps> = props => {
  return (
    <div
      class={clsx(props.class, 'rwcn-layout-box', style['box'])}
      classList={props.classList}
      style={{
        ...props.style,
        padding: props.padding,
      }}
    >
      {props.children}
    </div>
  )
}

export type InlineProps = StyleProps & ParentProps

export const Inline: Component<InlineProps> = props => {
  return (
    <span
      class={clsx(props.class, 'rwcn-layout-box', 'rwcn-widget', style['box'])}
      classList={props.classList}
      style={props.style}
    >
      {props.children}
    </span>
  )
}
