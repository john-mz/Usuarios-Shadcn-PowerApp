"use client"

import type { ComponentProps } from "react"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"

type LoginFormProps = ComponentProps<"form">

const LOGIN_PROFILE_STORAGE_KEY = "zeta-login-profile"

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const correo = String(formData.get("email") ?? "")
    const clave = String(formData.get("password") ?? "")

    window.sessionStorage.setItem(
      LOGIN_PROFILE_STORAGE_KEY,
      JSON.stringify({ correo, clave })
    )

    router.push("/dashboard")
  }

  return (
    
    <form
      className={cn(
        "flex flex-col gap-6 rounded-xl border border-border/60 bg-background/85 p-6 shadow-lg backdrop-blur-sm",
        className,
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Inicia sesión</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Ingresa tu correo y contraseña para acceder al sistema.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@correo.com"
            className="bg-background"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            className="bg-background"
          />
        </Field>
        <Field>
          <Button type="submit">Entrar</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
