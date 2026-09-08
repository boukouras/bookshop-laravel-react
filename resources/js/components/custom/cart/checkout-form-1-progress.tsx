'use client'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
const STEPS = [
    { number: 1, title: 'Contact' },
    { number: 2, title: 'Shipping' },
    { number: 3, title: 'Payment' },
]
export function CheckoutForm1Progress({ step, }: { step: number }) {
    return (
        <nav aria-label="Checkout progress" className="mb-8">
            <ol className="flex items-center justify-center">
                {STEPS.map((item, index) => {
                    const isCompleted = item.number < step
                    const isCurrent = item.number === step
                    return (
                        <li key={item.number} className="flex items-center"                        >
                            <div className="flex flex-col items-center">
                                <div aria-current={isCurrent ? 'step' : undefined}
                                    className={cn(
                                        'flex size-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all',
                                        isCompleted &&
                                        'border-primary bg-primary text-primary-foreground',
                                        isCurrent &&
                                        'border-primary bg-primary text-primary-foreground ring-4 ring-primary/10',
                                        !isCompleted &&
                                        !isCurrent &&
                                        'border-muted bg-background text-muted-foreground',
                                    )}>
                                    {isCompleted ? (<Check className="size-4" />) : (item.number)}
                                </div>
                                <span className={cn(
                                    'mt-2 text-xs font-medium transition-colors sm:text-sm',
                                    item.number <= step ? 'text-foreground' : 'text-muted-foreground',
                                )}>
                                    {item.title}
                                </span>
                            </div>
                            {index < STEPS.length - 1 && (
                                <div aria-hidden="true" className="mx-3 mb-6 h-0.5 w-10 bg-muted sm:mx-4 sm:w-16 md:w-24">
                                    <div className={cn(
                                        'h-full transition-all duration-300',
                                        item.number < step ? 'w-full bg-primary' : 'w-0',
                                    )} />
                                </div>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}