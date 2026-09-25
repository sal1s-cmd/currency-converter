import { fetchRates } from './api.js';
import type { ConverterState } from './types.js';

const CURRENCIES = ['USD', 'EUR', 'RUB', 'GBP', 'JPY', 'CNY', 'KZT', 'UAH', 'TRY', 'CHF'];

const amountInput = document.getElementById('amount') as HTMLInputElement;
const fromSelect = document.getElementById('from') as HTMLSelectElement;
const toSelect = document.getElementById('to') as HTMLSelectElement;
const convertBtn = document.getElementById('convert') as HTMLButtonElement;
const resultEl = document.getElementById('result') as HTMLParagraphElement;
const rateEl = document.getElementById('rate') as HTMLParagraphElement;

const state: ConverterState = {
  amount: 1,
  from: 'USD',
  to: 'RUB',
  rates: {}
};

function fillSelects(): void {
  CURRENCIES.forEach(code => {
    fromSelect.add(new Option(code, code));
    toSelect.add(new Option(code, code));
  });
  fromSelect.value = state.from;
  toSelect.value = state.to;
}

function convert(): void {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(amount) || amount <= 0) {
    resultEl.textContent = 'Введите сумму';
    rateEl.textContent = '';
    return;
  }

  const fromRate = state.rates[from];
  const toRate = state.rates[to];

  if (!fromRate || !toRate) {
    resultEl.textContent = 'Ошибка курса';
    return;
  }

  const inUsd = amount / fromRate;
  const converted = inUsd * toRate;

  state.amount = amount;
  state.from = from;
  state.to = to;

  resultEl.textContent = `${converted.toFixed(2)} ${to}`;
  rateEl.textContent = `1 ${from} = ${(toRate / fromRate).toFixed(4)} ${to}`;
}

async function init(): Promise<void> {
  fillSelects();

  try {
    const data = await fetchRates();
    state.rates = data.rates;
    convert();
  } catch (err) {
    resultEl.textContent = 'Failed to load rates';
    console.error(err);
  }
}

convertBtn.addEventListener('click', convert);
amountInput.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter') convert();
});
fromSelect.addEventListener('change', convert);
toSelect.addEventListener('change', convert);

init();
