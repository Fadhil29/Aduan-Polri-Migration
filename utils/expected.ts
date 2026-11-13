import fs from 'fs';
import path from 'path';

export type PolresRow = { polres: string; email: string };
export type PoldaExpected = {
  key: string;
  polda: string;
  loginEmail: string | null;
  summaryCount: number | null;
  polres: PolresRow[];
};

export const poldaList: PoldaExpected[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/expected.json'), 'utf-8'),
);

export const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toUpperCase();
