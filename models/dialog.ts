import { EventMessage, Message } from '@line/bot-sdk'

export class Dialog {
  userId: string
  maxConversations: number
  conversations: EventMessage []
  count: number
  responseMessages: Message[]
  lastMessageToUser: Message | null

  constructor (userId: string, maxConversations = 100) {
    this.userId = userId
    this.maxConversations = maxConversations
    this.conversations = []
    this.count = 0
    this.responseMessages = []
    this.lastMessageToUser = null
  }

  public push (message: EventMessage, response: Message) {
    if (this.conversations.length >= 100) {
      this.conversations.shift()
    }
    if (this.responseMessages.length >= 100) {
      this.responseMessages.shift()
    }
    this.conversations.push(message)
    this.count = this.conversations.length
    console.log('Push', response)
    this.lastMessageToUser = response
    this.responseMessages.push(response)
  }

  public pop () {
    if (this.responseMessages.length > 0) {
      this.responseMessages.pop()
      this.lastMessageToUser = this.responseMessages[this.responseMessages.length - 1]
    }
  }

  public clear () {
    this.responseMessages = []
    this.lastMessageToUser = null
  }
}
