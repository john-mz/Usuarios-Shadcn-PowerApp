import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { DashboardUser } from "./types"

type DashboardTableProps = {
  users: DashboardUser[]
  onEdit: (user: DashboardUser) => void
  onDelete: (userId: string) => void
}

export function DashboardTable({
  users,
  onEdit,
  onDelete,
}: DashboardTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuarios cargados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  Nombre
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  Correo
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border/70">
                  <td className="px-4 py-3 font-medium">{user.nombre}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.correo}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => onEdit(user)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        type="button"
                        onClick={() => onDelete(user.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 ? (
          <div className="px-4 py-8 text-center text-muted-foreground">
            No hay registros temporales para mostrar.
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
