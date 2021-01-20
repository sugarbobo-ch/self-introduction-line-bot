import { EventMessage, Message, WebhookEvent } from '@line/bot-sdk'
import { Dialog } from '../models/dialog'
import { User } from '../models/user'

const userDict = {} as { [key: string]: User | undefined }

function isNewUser (event: WebhookEvent): boolean {
  const source = event.source
  const { userId } = source
  if (userId && userDict[userId]) {
    // User is idle for an hour, clear previous state
    if (event.timestamp - userDict[userId]!.createAt > 1000 * 60 * 60) {
      userDict[userId] = undefined
      return false
    }
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
  const user = userDict[userId]
  if (user) {
    return user.dialog.lastMessageToUser
  }
  return null
}

function saveMessage (userId: string, message: EventMessage, response: Message): void {
  const user = userDict[userId]
  if (user) {
    user.dialog.push(message, response)
  }
}

function popMessage (userId: string): void {
  const user = userDict[userId]
  if (user) {
    user.dialog.pop()
  }
}

function clearMessage (userId: string): void {
  const user = userDict[userId]
  if (user) {
    user.dialog.clear()
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
