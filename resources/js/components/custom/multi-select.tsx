import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export interface MultiSelectOption<T = string> {
    label: string
    value: T
}

interface MultiSelectProps<T extends string | number> {
    options: MultiSelectOption<T>[]
    value: T[]
    onValueChange: (value: T[]) => void
    placeholder?: string
    searchPlaceholder?: string
    emptyMessage?: string
    disabled?: boolean
    className?: string
}

export function MultiSelect<T extends string | number>({
    options,
    value,
    onValueChange,
    placeholder = "Select...",
    searchPlaceholder = "Search...",
    emptyMessage = "No results found.",
    disabled = false,
    className,
}: MultiSelectProps<T>) {
    const [open, setOpen] = React.useState(false)

    const selectedOptions = options.filter((option) =>
        value.includes(option.value)
    )

    const toggleOption = (optionValue: T) => {
        if (value.includes(optionValue)) {
            onValueChange(
                value.filter((item) => item !== optionValue)
            )
        } else {
            onValueChange([...value, optionValue])
        }
    }

    const removeOption = (
        optionValue: T,
        event: React.MouseEvent
    ) => {
        event.stopPropagation()

        onValueChange(
            value.filter((item) => item !== optionValue)
        )
    }

    const clearAll = (event: React.MouseEvent) => {
        event.stopPropagation()
        onValueChange([])
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                        "min-h-10 h-auto w-full justify-between",
                        selectedOptions.length === 0 && "text-muted-foreground",
                        className
                    )}
                >
                    <div className="flex flex-wrap items-center gap-1">
                        {selectedOptions.length > 0 ? (
                            selectedOptions.map((option) => (
                                <Badge
                                    key={String(option.value)}
                                    variant="secondary"
                                    className="gap-1"
                                >
                                    {option.label}

                                    <span
                                        role="button"
                                        tabIndex={0}
                                        className="cursor-pointer rounded-full outline-none hover:bg-muted"
                                        onClick={(event) =>
                                            removeOption(option.value, event)
                                        }
                                        onKeyDown={(event) => {
                                            if (
                                                event.key === "Enter" ||
                                                event.key === " "
                                            ) {
                                                event.preventDefault()
                                                onValueChange(
                                                    value.filter(
                                                        (item) =>
                                                            item !== option.value
                                                    )
                                                )
                                            }
                                        }}
                                    >
                                        <X className="h-3 w-3" />
                                    </span>
                                </Badge>
                            ))
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </div>

                    <div className="ml-2 flex shrink-0 items-center gap-1">
                        {selectedOptions.length > 0 && (
                            <span
                                role="button"
                                tabIndex={0}
                                className="rounded-sm p-1 hover:bg-muted"
                                onClick={clearAll}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === "Enter" ||
                                        event.key === " "
                                    ) {
                                        event.preventDefault()
                                        onValueChange([])
                                    }
                                }}
                            >
                                <X className="h-4 w-4" />
                            </span>
                        )}

                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                    </div>
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0"
                align="start"
            >
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />

                    <CommandList>
                        <CommandEmpty>
                            {emptyMessage}
                        </CommandEmpty>

                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = value.includes(
                                    option.value
                                )

                                return (
                                    <CommandItem
                                        key={String(option.value)}
                                        value={option.label}
                                        onSelect={() =>
                                            toggleOption(option.value)
                                        }
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <Check className="h-4 w-4" />
                                        </div>

                                        {option.label}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
