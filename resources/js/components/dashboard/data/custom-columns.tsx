"use client"

import type { ColumnDef, RowData } from "@tanstack/react-table"
import type { DataTableFeatures } from "./data-table-features"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export interface DataTableAction<TData extends RowData> {
    label: string
    onClick: (row: TData) => void
}

interface CreateColumnsOptions<TData extends RowData> {
    columns: ColumnDef<DataTableFeatures, TData>[]
    actions?: DataTableAction<TData>[]
    selectable?: boolean
}

export function createColumns<TData extends RowData>({
    columns,
    actions = [],
    selectable = true,
}: CreateColumnsOptions<TData>): ColumnDef<DataTableFeatures, TData>[] {

    const result: ColumnDef<DataTableFeatures, TData>[] = []

    /*
    |--------------------------------------------------------------------------
    | Select
    |--------------------------------------------------------------------------
    */

    if (selectable) {
        result.push({
            id: "select",

            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    indeterminate={
                        table.getIsSomePageRowsSelected() &&
                        !table.getIsAllPageRowsSelected()
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),

            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) =>
                        row.toggleSelected(!!value)
                    }
                    aria-label="Select row"
                />
            ),

            enableSorting: false,
            enableHiding: false,
        })
    }

    /*
    |--------------------------------------------------------------------------
    | Custom columns
    |--------------------------------------------------------------------------
    */

    result.push(...columns)

    /*
    |--------------------------------------------------------------------------
    | Actions
    |--------------------------------------------------------------------------
    */

    if (actions.length > 0) {
        result.push({
            id: "actions",

            header: "Actions",

            enableSorting: false,
            enableHiding: false,

            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                        >
                            <span className="sr-only">
                                Open menu
                            </span>

                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                            Actions
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        {actions.map((action) => (
                            <DropdownMenuItem
                                key={action.label}
                                onClick={() =>
                                    action.onClick(row.original)
                                }
                            >
                                {action.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        })
    }

    return result
}