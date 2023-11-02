export interface MeResponse {
  succeed: boolean
  data: User
}

export interface User {
  id: number
  name: string
  email: string
  password: string
  type: string
  createdAt: Date
  updatedAt: Date
}

export async function fetchMe(): Promise<User> {
  return fetch('/api/user/me')
    .then(res => res.json())
    .then((res: MeResponse) => res.data)
}
