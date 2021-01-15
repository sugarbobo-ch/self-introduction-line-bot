import { MessageEvent } from '@line/bot-sdk'

export class Dialog {
  userId: string
  maxConversations: number
  conversations: MessageEvent []
  count: number

  constructor (userId: string, maxConversations = 100) {
    this.userId = userId
    this.maxConversations = maxConversations
    this.conversations = []
    this.count = 0
  }

  public push (message: MessageEvent) {
    if (this.conversations.length >= 100) {
      this.conversations.shift()
    }
    this.conversations.push(message)
    this.count = this.conversations.length
  }
}
