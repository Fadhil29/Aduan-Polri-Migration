import { test, expect } from '@playwright/test';
import { expected, norm } from '../../utils/expected';

// TODO: isi setelah hasil codegen menu tersedia.
// Helper ini dipanggil dari hasil record: navigasi ke menu + set page size ke max,
// lalu baca semua baris datatable (handle pagination).
async function readTable(page): Promise<string[][]> {
  throw new Error('belum diisi, tempel hasil codegen');
}

test.describe('Migrasi data Polda & Polres', () => {
  test('jumlah Polda sesuai Excel', async ({ page }) => {
    // const rows = await readTable(page);
    // expect(new Set(rows.map(r => norm(r[0]))).size).toBe(expected.polda.length);
  });

  test('tiap Polres dari Excel ada di datatable & di Polda yang benar', async ({ page }) => {
    // const rows = await readTable(page);
    // const actual = new Set(rows.map(r => `${norm(r[0])}|${norm(r[1])}`));
    // const missing = expected.polres.filter(r => !actual.has(`${norm(r.polda)}|${norm(r.polres)}`));
    // expect(missing, 'Polres tidak ada / nyasar ke Polda lain').toEqual([]);
  });

  test('tidak ada data ekstra di datatable yang tidak ada di Excel', async ({ page }) => {});

  test('jumlah Polres per Polda sesuai sheet Ringkasan', async ({ page }) => {});

  test('email Polres sesuai Excel', async ({ page }) => {});
});
