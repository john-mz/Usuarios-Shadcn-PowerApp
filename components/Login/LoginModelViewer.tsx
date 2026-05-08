"use client"

import { createElement, useEffect } from "react"

type LoginModelViewerProps = {
  className?: string
}

export function LoginModelViewer({ className }: LoginModelViewerProps) {
  useEffect(() => {
    void import("@google/model-viewer")
  }, [])

  return createElement("model-viewer", {
    src: "/rubiks_cube/scene.gltf",
    alt: "Modelo 3D de un cubo de Rubik.",
    "camera-controls": true,
    "auto-rotate": true,
    "rotation-per-second": "30deg",
    "disable-zoom": true,
    "interaction-prompt": "none",
    "shadow-intensity": "0",
    exposure: "1",
    className,
    style: {
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
    },
  })
}
