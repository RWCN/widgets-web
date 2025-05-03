import { Button } from './components/button.tsx'
import { TextInput } from './components/text-input.tsx'
import style from './app.module.css'
import clsx from 'clsx'
import { Col, Row } from './components/layout.tsx'
import './app.css'
import { Paragraph, Text } from './components/text.tsx'
import { Component } from 'solid-js'

export const App: Component = () => {
  return (
    <div class={clsx('app', style['app'])}>
      <Button>I am a button.</Button>
      <TextInput placeholder='我是文本输入框' />
      <Col>
        <Row>
          <Col>a</Col>
          <Col>b</Col>
        </Row>
        <Row reverse>
          <Col>a</Col>
          <Col>b</Col>
        </Row>
      </Col>
      <Text>Text Test</Text>
      <Paragraph>
        Paragraph for test. Long long ago, there lives a king, the king loves
        horses. One day...
      </Paragraph>
    </div>
  )
}

export default App
