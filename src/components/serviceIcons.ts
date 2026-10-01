import { BarChart, Bot, Box, Cog, Eye, TrendingUp, type LucideIcon } from 'lucide-react';

// Per id de servei (aboutPage.what.items als JSON d'idiomes)
export const serviceIcons: Record<string, LucideIcon> = {
  predictive: Cog,
  vision: Eye,
  digital: Box,
  bots: Bot,
  analytics: BarChart,
  optimization: TrendingUp,
};
