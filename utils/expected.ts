import fs from 'fs';
import path from 'path';

export type PolresRow = { polda: string; polres: string; email: string };
export type Expected = {
  polda: string[];
  polres: PolresRow[];
  summary: Record<string, number>;
  total: number;
};

export const expected: Expected = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/expected.json'), 'utf-8'),
);

export const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toUpperCase();
