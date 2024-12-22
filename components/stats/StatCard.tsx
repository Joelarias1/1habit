import { PieChart, Pie, Cell } from 'recharts';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string
  value: string | number
  percentage: number
  trend: 'up' | 'down'
  icon: LucideIcon
  color?: string
}

export function StatCard({ 
  title, 
  value, 
  percentage, 
  trend, 
  icon: Icon,
  color = '#22c55e'
}: StatCardProps) {
  const data = [
    { value: percentage },
    { value: 100 - percentage }
  ];

  return (
    <div className="bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all">
      <div className="flex flex-col items-center">
        {/* Chart Section */}
        <div className="w-32 h-32 relative mb-4">
          <PieChart width={128} height={128}>
            <Pie
              data={data}
              cx={64}
              cy={64}
              innerRadius={50}
              outerRadius={56}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={color} />
              <Cell fill="rgba(255,255,255,0.03)" />
            </Pie>
          </PieChart>
          {/* Valor central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{percentage}%</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          <p className="text-sm font-medium text-white/60">{title}</p>
          <div className={cn(
            "inline-flex items-center gap-1.5 text-sm font-medium",
            trend === 'up' ? "text-emerald-500" : "text-rose-500"
          )}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  );
} 