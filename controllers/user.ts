import { EventMessage, EventSource, Message, WebhookEvent } from '@line/bot-sdk'
import { Dialog } from '../models/dialog'
import { User } from '../models/user'

const userDict = {} as { [key: string]: User }

function isNewUser (source: EventSource): boolean {
  const { userId } = source
  if (userId && userDict[userId]) {
    return true
  }
  return false
}

function createNewUser (event: WebhookEvent): void {
  const { timestamp, source } = event
  const { userId } = source
  if (source && userId) {
    const dialog = new Dialog(userId)
    userDict[userId] = new User(userId, timestamp, dialog)
  }
}

function getLastMessage (userId: string): Message | null {
  if (userId && userDict[userId]) {
    return userDict[userId].dialog.lastMessageToUser
  }
  return null
}

function saveMessage (userId: string, message: EventMessage, response: Message): void {
  if (userId && userDict[userId]) {
    userDict[userId].dialog.push(message, response)
  }
}

function popMessage (userId: string): void {
  if (userId && userDict[userId]) {
    userDict[userId].dialog.pop()
  }
}

function clearMessage (userId: string): void {
  if (userId && userDict[userId]) {
    userDict[userId].dialog.clear()
  }
}

export const userManager = {
  isNewUser,
  createNewUser,
  getLastMessage,
  saveMessage,
  popMessage,
  clearMessage
}
