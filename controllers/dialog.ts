import { EventMessage, EventSource, TemplateMessage, TextEventMessage, Message, FlexMessage } from '@line/bot-sdk'
import { userManager } from './user'
import * as Menu from '../config/menu.json'

interface IMenu {
  [key: string]: any;
  [index: number]: any;
};
const menu = Menu as IMenu

function executeCommands (source: EventSource, message: EventMessage): Message {
  const text = ''
  if (message.type === 'text') {
    const treeNodes = userManager.getUserTree(source.userId!)
    if (treeNodes.length === 0) {
      treeNodes.push(0)
      return sayHello((message as TextEventMessage).text)
    } else if (treeNodes.length === 1) {
      return showMessage(source.userId!, message.text)
    }
  }
  return { type: 'text', text }
}

function sayHello (text: string): TemplateMessage {
  return menu.home as TemplateMessage
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
