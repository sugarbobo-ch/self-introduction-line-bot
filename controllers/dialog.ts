import { EventMessage, TextEventMessage } from '@line/bot-sdk'

function executeCommands (message: EventMessage): string {
  let text = ''
  if (message.type === 'text') {
    text += sayHello((message as TextEventMessage).text)
  }
  return text
}

function sayHello (text: string): string {
  const keywords = ['嗨', '你好', '哈囉', 'hello', 'hi', '安安']
  if (keywords.includes(text)) {
    return keywords[Math.floor(Math.random() * keywords.length)]
  }
  return ''
}

export const dialogManager = {
  executeCommands
}
