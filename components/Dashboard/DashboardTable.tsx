import { PencilIcon, SearchIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
  totalUsers: number
  searchQuery: string
  onEdit: (user: DashboardUser) => void
  onDelete: (user: DashboardUser) => void
  onSearchChange: (value: string) => void
}

export function DashboardTable({
  users,
  totalUsers,
  searchQuery,
  onEdit,
  onDelete,
  onSearchChange,
}: DashboardTableProps) {
  const hasSearch = searchQuery.trim().length > 0

  const rows =
    users.length > 0 ? (
      users.map((user) => (
        <TableRow key={user.id} className="hover:bg-muted/40">
          <TableCell className="px-4 py-3 font-medium">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-foreground">
                {user.nombre.slice(0, 2).toUpperCase()}
              </div>
              <span>{user.nombre}</span>
            </div>
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
                <PencilIcon data-icon="inline-start" />
                Editar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                type="button"
                onClick={() => onDelete(user)}
              >
                <Trash2Icon data-icon="inline-start" />
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
          {hasSearch
            ? "No hay estudiantes que coincidan con la busqueda."
            : "No hay registros temporales para mostrar."}
        </TableCell>
      </TableRow>
    )

  return (
    <Card className="border-border/70 bg-background/90">
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle>Directorio de estudiantes</CardTitle>
            <CardDescription>
              {users.length} de {totalUsers} registros visibles
            </CardDescription>
          </div>
          <div className="relative w-full md:max-w-xs">
            <SearchIcon
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Buscar por nombre o correo"
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
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
