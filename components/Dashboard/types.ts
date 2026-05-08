export type DashboardUser = {
  id: string
  nombre: string
  correo: string
}

export type DirectoryPayload = {
  nombres: string[]
  correos: string[]
}

export type DashboardUsersResponse = {
  source: "remote" | "fallback"
  users: DashboardUser[]
}
