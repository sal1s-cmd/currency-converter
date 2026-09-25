export interface RatesResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface ConverterState {
  amount: number;
  from: string;
  to: string;
  rates: Record<string, number>;
}
