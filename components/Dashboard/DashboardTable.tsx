import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { DashboardUser } from "./types"

type DashboardTableProps = {
  users: DashboardUser[]
  onEdit: (user: DashboardUser) => void
  onDelete: (user: DashboardUser) => void
}

export function DashboardTable({
  users,
  onEdit,
  onDelete,
}: DashboardTableProps) {
  const rows =
    users.length > 0 ? (
      users.map((user) => (
        <TableRow key={user.id}>
          <TableCell className="px-4 py-3 font-medium">
            {user.nombre}
          </TableCell>
          <TableCell className="px-4 py-3 text-muted-foreground">
            {user.correo}
          </TableCell>
          <TableCell className="px-4 py-3">
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
                onClick={() => onDelete(user)}
              >
                Eliminar
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell
          colSpan={3}
          className="px-4 py-8 text-center text-muted-foreground"
        >
          No hay registros temporales para mostrar.
        </TableCell>
      </TableRow>
    )

  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-3 text-muted-foreground">
                Nombre
              </TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground">
                Correo
              </TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{rows}</TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
