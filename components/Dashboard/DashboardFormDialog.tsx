"use client"

import { useId, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

import type { DashboardUser } from "./types"

type DashboardFormValues = {
  nombre: string
  correo: string
}

type DashboardFormDialogProps = {
  mode: "create" | "edit"
  open: boolean
  initialValue?: DashboardUser | null
  onClose: () => void
  onSubmit: (values: DashboardFormValues) => void
}

export function DashboardFormDialog({
  mode,
  open,
  initialValue,
  onClose,
  onSubmit,
}: DashboardFormDialogProps) {
  const nameId = useId()
  const emailId = useId()
  const [nombre, setNombre] = useState(initialValue?.nombre ?? "")
  const [correo, setCorreo] = useState(initialValue?.correo ?? "")

  if (!open) {
    return null
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({
      nombre: nombre.trim(),
      correo: correo.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle>
            {mode === "create" ? "Nuevo registro" : "Editar registro"}
          </CardTitle>
          <CardDescription>
            {mode === "create"
              ? "Crea un usuario temporal visible solo en esta sesión."
              : "Actualiza el nombre o correo del registro seleccionado."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="dashboard-user-form" onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor={nameId}>Nombre</FieldLabel>
                <Input
                  id={nameId}
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
                  placeholder="Nombre del usuario"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor={emailId}>Correo</FieldLabel>
                <Input
                  id={emailId}
                  type="email"
                  value={correo}
                  onChange={(event) => setCorreo(event.target.value)}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button form="dashboard-user-form" type="submit">
            {mode === "create" ? "Crear" : "Guardar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
