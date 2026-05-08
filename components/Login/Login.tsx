import Image from "next/image"

import { LoginForm } from "./LoginForm"

export function Login() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <section className="flex flex-col gap-6 p-6 md:p-10">
        <div className="flex justify-center md:justify-start">
          <div className="inline-flex items-center rounded-full border border-border/70 bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            Portal de acceso
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </section>
      <section className="relative hidden bg-muted lg:block">
        <Image
          src="/estudiantes.jpg"
          alt="Grupo de estudiantes sonriendo al aire libre con cuadernos y mochilas."
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
      </section>
    </main>
  )
}
