import { EventMessage, EventSource, TemplateMessage, Message, FlexMessage } from '@line/bot-sdk'
import { userManager } from './user'
import * as Menu from '../config/menu.json'

interface IMenu {
  [key: string]: any;
  [index: number]: any;
};
const menu = Menu as IMenu

function executeCommands (source: EventSource, message: EventMessage): Message {
  const userId = source.userId
  let echo = sayHello() as Message
  if (userId && message.type === 'text') {
    const treeNodes = userManager.getMessages(userId)
    if (treeNodes.length === 0) {
      userManager.saveMessage(userId, message, echo)
      return echo
    } else if (treeNodes.length >= 1) {
      if (message.text === menu.back) {
        userManager.popMessage(userId)
        return userManager.getLastMessage(userId) || sayHello()
      }
      echo = showMessage(userId, message.text)
      userManager.saveMessage(userId, message, echo)
      return echo
    }
  }
  return echo
}

function sayHello (): TemplateMessage {
  let helloMessage = JSON.stringify(menu.home)
  helloMessage = helloMessage.replace(/\${timeHello}/g, (): string => {
    const date = new Date()
    const hour = date.getUTCHours() + parseInt(process.env.TIME_ZONE || '8')
    if (hour >= 5 && hour < 12) {
      return '早安'
    } else if (hour > 12 && hour < 18) {
      return '午安'
    } else {
      return '晚安'
    }
  })
  console.log(helloMessage)
  return JSON.parse(helloMessage) as TemplateMessage
}

function showMessage (userId: string, text: string): FlexMessage {
  if (menu.options[text] === undefined) {
    const echo = userManager.getLastMessage(userId)
    return echo || menu.home
  }
  return menu.options[text] as FlexMessage
}

export const dialogManager = {
  executeCommands,
  sayHello
}
