export interface User {
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface ListUsers extends User {
  id: string
}
