export interface User {
  id?: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface ListUsers extends User {
  id: string
}
