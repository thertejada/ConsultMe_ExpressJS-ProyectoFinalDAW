import { StatType } from 'enums';

interface Stat {
  name: string;
  value: number;
}

interface CompanyOrderStat {
  type: StatType;
  stats: Array<Stat>;
}

export { StatType, CompanyOrderStat };
