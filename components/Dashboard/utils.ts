import type { DashboardUser, DirectoryPayload } from "./types"

export const POWER_AUTOMATE_URL =
  "https://defaultd63d49e520a44df5b7587b3ea97d92.eb.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/747cea6f1bbb40f7b695ee6d0961cac6/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PdYEBDTCTJCvRqnQlXiATkq3Ti7zF_EIlkXaGb5KTgI"

export const FALLBACK_USERS: DashboardUser[] = [
  {
    id: "fallback-ospina",
    nombre: "Ospina",
    correo: "juan.ospinao@uam.edu.co",
  },
  {
    id: "fallback-julian",
    nombre: "Julian",
    correo: "julian.hinestroza@uam.edu.co",
  },
  {
    id: "fallback-pantoja",
    nombre: "Pantoja",
    correo: "juan.pantojao@uam.edu.co",
  },
  {
    id: "fallback-luis",
    nombre: "Luis",
    correo: "luis.paredes@uam.edu.co",
  },
]

export function parseDirectoryPayload(raw: string): DirectoryPayload | null {
  const nombresMatch = raw.match(/nombres:\s*(\[[\s\S]*?\])/)
  const correosMatch = raw.match(/correos:\s*(\[[\s\S]*?\])/)

  if (!nombresMatch || !correosMatch) {
    return null
  }

  try {
    const nombres = JSON.parse(nombresMatch[1]) as unknown
    const correos = JSON.parse(correosMatch[1]) as unknown

    if (
      !Array.isArray(nombres) ||
      !Array.isArray(correos) ||
      !nombres.every((item) => typeof item === "string") ||
      !correos.every((item) => typeof item === "string")
    ) {
      return null
    }

    return { nombres, correos }
  } catch {
    return null
  }
}

export function toDashboardUsers(payload: DirectoryPayload): DashboardUser[] {
  const total = Math.min(payload.nombres.length, payload.correos.length)

  return Array.from({ length: total }, (_, index) => ({
    id: `remote-${index}-${payload.nombres[index].toLowerCase()}`,
    nombre: payload.nombres[index],
    correo: payload.correos[index],
  }))
}
