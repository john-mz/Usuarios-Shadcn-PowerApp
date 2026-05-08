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
  const [nombre, setNombre] = useState(profile.nombre)
  const [correo, setCorreo] = useState(profile.correo)
  const [clave, setClave] = useState(profile.clave)
  const [avatar, setAvatar] = useState(profile.avatar)

  const initials = useMemo(() => {
    return nombre
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((value) => value[0]?.toUpperCase() ?? "")
      .join("")
  }, [nombre])

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
      nombre: nombre.trim(),
      correo: correo.trim(),
      clave: clave.trim(),
      avatar,
    })
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
        <CardDescription>
          Actualiza tu avatar y tus datos. Los cambios también son temporales y
          se pierden al recargar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="profile-form"
          className="flex flex-col gap-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex size-24 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-2xl font-semibold text-primary ring-1 ring-border">
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
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-sm font-medium">Avatar del perfil</p>
                <p className="text-sm text-muted-foreground">
                  Puedes subir una imagen local para esta sesión.
                </p>
              </div>
              <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted">
                <CameraIcon className="size-4" />
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
                  <UserRoundIcon className="size-4" />
                  Nombre
                </span>
              </FieldLabel>
              <Input
                id="profile-name"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                placeholder="Tu nombre"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="profile-email">
                <span className="inline-flex items-center gap-2">
                  <MailIcon className="size-4" />
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
                  <KeyRoundIcon className="size-4" />
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
      <CardFooter className="justify-end">
        <Button form="profile-form" type="submit">
          Guardar cambios
        </Button>
      </CardFooter>
    </Card>
  )
}
