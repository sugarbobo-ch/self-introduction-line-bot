import { Dialog } from './dialog'

export class User {
  userId: string
  createAt: number
  dialog: Dialog

  constructor (userId: string, timestamp: number, dialog: Dialog) {
    this.userId = userId
    this.createAt = timestamp
    this.dialog = dialog
  }
}
