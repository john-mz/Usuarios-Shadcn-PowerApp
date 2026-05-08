"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { LoginForm } from "./LoginForm"
import { LoginModelViewer } from "./LoginModelViewer"

export function Login() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntro(false)
    }, 2600)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <main className="relative grid min-h-svh lg:grid-cols-2">
      <div
        className={[
          "pointer-events-none absolute inset-0 z-50 overflow-hidden transition-opacity duration-700",
          showIntro ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-hidden={!showIntro}
      >
        <div className="absolute inset-0 bg-black" />
        <div className="relative flex min-h-svh items-center justify-center px-6">
          <div className="login-intro-title flex flex-col items-center gap-3 text-center text-white">
            <p className="text-xs uppercase tracking-[0.7em] text-white/60">
              Plataforma academica
            </p>
            <h1 className="text-5xl font-semibold tracking-[0.35em] text-white sm:text-6xl md:text-7xl">
              ZETA
            </h1>
            <p className="max-w-md text-sm tracking-[0.2em] text-white/70 uppercase sm:text-base">
              Sistema de Gestion de Estudiantes
            </p>
          </div>
        </div>
      </div>

      <section className="relative isolate overflow-hidden flex flex-col gap-6 p-6 md:p-10">
        <div className="relative z-10 flex justify-center md:justify-start">
          <div className="inline-flex items-center rounded-full border border-border/70 bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            Portal de acceso
          </div>
        </div>
        <div
          className={[
            "relative z-10 flex flex-1 items-center justify-center transition-all duration-700",
            showIntro
              ? "pointer-events-none translate-y-8 opacity-0"
              : "translate-y-0 opacity-100",
          ].join(" ")}
        >
          <div className="relative w-full max-w-sm pt-28">
            <div className="pointer-events-none absolute -top-24 left-1/2 z-20 -translate-x-1/2">
              <div className="h-64 w-64 scale-[0.35] opacity-95">
                <LoginModelViewer />
              </div>
            </div>
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
