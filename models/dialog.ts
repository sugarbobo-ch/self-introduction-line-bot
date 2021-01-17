import { Message, MessageEvent } from '@line/bot-sdk'

export class Dialog {
  userId: string
  maxConversations: number
  conversations: MessageEvent []
  count: number
  treeNodes: number[]
  lastMessageToUser: Message | null

  constructor (userId: string, maxConversations = 100) {
    this.userId = userId
    this.maxConversations = maxConversations
    this.conversations = []
    this.count = 0
    this.treeNodes = []
    this.lastMessageToUser = null
  }

  public push (message: MessageEvent, node: number) {
    if (this.conversations.length >= 100) {
      this.conversations.shift()
    }
    this.conversations.push(message)
    this.count = this.conversations.length
    this.treeNodes.push(node)
  }
}
