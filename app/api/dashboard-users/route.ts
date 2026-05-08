import { NextResponse } from "next/server"

import {
  FALLBACK_USERS,
  POWER_AUTOMATE_URL,
  parseDirectoryPayload,
  toDashboardUsers,
} from "@/components/Dashboard/utils"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const response = await fetch(POWER_AUTOMATE_URL, { cache: "no-store" })

    if (!response.ok) {
      throw new Error(`Unexpected status ${response.status}`)
    }

    const raw = await response.text()
    const payload = parseDirectoryPayload(raw)

    if (!payload) {
      throw new Error("Invalid payload")
    }

    return NextResponse.json({
      source: "remote",
      users: toDashboardUsers(payload),
    })
  } catch {
    return NextResponse.json({
      source: "fallback",
      users: FALLBACK_USERS,
    })
  }
}
