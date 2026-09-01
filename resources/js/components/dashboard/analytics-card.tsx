import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
type AnalyticsCardProps = {
    label?: string;
    value?: number;
    icon?: LucideIcon;
    percentage?: string;
    isPositive?: boolean;
};
export function AnalyticsCard({ stat }: { stat: AnalyticsCardProps }) {
    return (
        <Card className="rounded-xl border p-5 shadow-xs ring-0">
            <CardContent className="flex items-start justify-between p-0">
                <div className="flex flex-col justify-between gap-5">
                    <div className="flex flex-col gap-1">
                        {stat.label && (
                            <p className="text-lg font-medium text-card-foreground">
                                {stat.label}
                            </p>
                        )}
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-medium text-card-foreground">
                                {stat.value}
                            </p>
                            <Badge className={cn('font-normal text-muted-foreground',stat.isPositive !== false? 'bg-teal-400/10': 'bg-red-500/10',)}>
                                {stat.percentage}
                            </Badge>
                        </div>
                    </div>
                    {/* button */}
                    <Button variant={'outline'} className={'flex h-9 w-fit cursor-pointer items-center gap-1.5 rounded-lg px-4 shadow-xs'}>
                        <span>See Report</span>
                        <ArrowRight size={16} />
                    </Button>
                </div>
                <div className="rounded-full p-3 outline">
                    {stat.icon && <stat.icon size={20} />}
                </div>
            </CardContent>
        </Card>
    );
}
