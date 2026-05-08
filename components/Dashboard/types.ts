export type DashboardUser = {
  id: string
  nombre: string
  correo: string
}

export type DashboardView = "estudiantes" | "perfil"

export type ProfileData = {
  nombre: string
  correo: string
  clave: string
  avatar: string | null
}

export type DirectoryPayload = {
  nombres: string[]
  correos: string[]
}

export type DashboardUsersResponse = {
  source: "remote" | "fallback"
  users: DashboardUser[]
}
