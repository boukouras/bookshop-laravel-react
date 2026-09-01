"use client"
import * as React from "react"
import { useTable, type ColumnDef, type RowData, type SortingState, type ColumnFiltersState, type ColumnVisibilityState, } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { DataTablePagination } from "./data-table-pagination"
import { features, type DataTableFeatures } from "./data-table-features"
import { DataTableViewOptions } from "./data-table-view-option"
import { adminProductsShow } from "@/routes"
import { Link } from "@inertiajs/react"

interface DataTableProps<TData extends RowData> {
    columns: ColumnDef<DataTableFeatures, TData>[]
    data: TData[]
}

export function DataTable<TData extends RowData>({
    columns,
    data,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useTable({
        features,
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },

    })

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter titles..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DataTableViewOptions table={table} />
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <table.FlexRender header={header} />
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <ContextMenu key={row.id}>
                                    <ContextMenuTrigger asChild>
                                        <TableRow
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    <table.FlexRender cell={cell} />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </ContextMenuTrigger>

                                    <ContextMenuContent>
                                        <ContextMenuItem>
                                            <Link href={adminProductsShow(row.original.id)}>View</Link>
                                        </ContextMenuItem>

                                        <ContextMenuSeparator />

                                        <ContextMenuItem
                                            variant="destructive"
                                            onClick={() => {
                                                console.log("Delete", row.original)
                                            }}
                                        >
                                            Delete
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <DataTablePagination table={table} />
                </div>
            </div>
        </div >
    )
}