import { Dialog } from './dialog'

export class User {
  userId: string
  timestamp: number

  constructor (userId: string, timestamp: number, dialog: Dialog) {
    this.userId = userId
    this.timestamp = timestamp
  }
}
