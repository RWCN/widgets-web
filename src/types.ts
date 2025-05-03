import { JSX } from 'solid-js/jsx-runtime'

export type MaybePromise<T> = T | Promise<T>

export type StyleProps = {
  class?: string
  classList?: {
    [k: string]: boolean | undefined
  }
  style?: JSX.CSSProperties
}
