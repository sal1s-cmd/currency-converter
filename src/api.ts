import type { RatesResponse } from './types.js';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

export async function fetchRates(): Promise<RatesResponse> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
