"use client"

import { useMemo, useState } from "react"
import { CameraIcon, KeyRoundIcon, MailIcon, UserRoundIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import type { ProfileData } from "./types"

type ProfilePanelProps = {
  profile: ProfileData
  onSave: (profile: ProfileData) => void
}

export function ProfilePanel({ profile, onSave }: ProfilePanelProps) {
  const [correo, setCorreo] = useState(profile.correo)
  const [clave, setClave] = useState(profile.clave)
  const [avatar, setAvatar] = useState(profile.avatar)

  const initials = useMemo(() => {
    return "Administrador"
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((value) => value[0]?.toUpperCase() ?? "")
      .join("")
  }, [])

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === "string") {
        setAvatar(result)
      }
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onSave({
      nombre: "Administrador",
      correo: correo.trim(),
      clave: clave.trim(),
      avatar,
    })
  }

  return (
    <Card className="max-w-3xl border-border/70 bg-background/90">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Perfil del administrador</CardTitle>
            <CardDescription>
              Actualiza tu avatar y tus datos de acceso.
            </CardDescription>
          </div>
          <div className="rounded-md bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Sesion local
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form
          id="profile-form"
          className="flex flex-col gap-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-5 rounded-lg border border-border bg-muted/30 p-4 md:flex-row md:items-center">
            <div className="flex size-28 items-center justify-center overflow-hidden rounded-xl bg-primary text-3xl font-semibold text-primary-foreground shadow-sm">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatar}
                  alt="Avatar del usuario"
                  className="size-full object-cover"
                />
              ) : (
                initials || "U"
              )}
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <div>
                <p className="text-base font-medium">Avatar del perfil</p>
                <p className="text-sm text-muted-foreground">
                  Esta imagen identifica al administrador durante la sesion.
                </p>
              </div>
              <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted">
                <CameraIcon aria-hidden="true" />
                Cambiar avatar
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="profile-name">
                <span className="inline-flex items-center gap-2">
                  <UserRoundIcon aria-hidden="true" />
                  Nombre
                </span>
              </FieldLabel>
              <Input
                id="profile-name"
                value="Administrador"
                disabled
                readOnly
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="profile-email">
                <span className="inline-flex items-center gap-2">
                  <MailIcon aria-hidden="true" />
                  Correo
                </span>
              </FieldLabel>
              <Input
                id="profile-email"
                type="email"
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
                placeholder="correo@ejemplo.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="profile-password">
                <span className="inline-flex items-center gap-2">
                  <KeyRoundIcon aria-hidden="true" />
                  Clave
                </span>
              </FieldLabel>
              <Input
                id="profile-password"
                type="password"
                value={clave}
                onChange={(event) => setClave(event.target.value)}
                placeholder="Nueva clave"
                required
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-end border-t border-border/70">
        <Button form="profile-form" type="submit">
          Guardar cambios
        </Button>
      </CardFooter>
    </Card>
  )
}
