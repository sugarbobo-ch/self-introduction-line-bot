import { EventSource, WebhookEvent } from '@line/bot-sdk'
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

export const userManager = {
  isNewUser,
  createNewUser
}
