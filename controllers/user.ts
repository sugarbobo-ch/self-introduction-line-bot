import { EventSource, Message, WebhookEvent } from '@line/bot-sdk'
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

function getUserTree (userId: string): Number[] {
  if (userId && userDict[userId]) {
    return userDict[userId].dialog.treeNodes
  }
  return []
}

function getLastMessage (userId: string): Message | null {
  if (userId && userDict[userId]) {
    return userDict[userId].dialog.lastMessageToUser
  }
  return null
}

export const userManager = {
  isNewUser,
  createNewUser,
  getUserTree,
  getLastMessage
}
