import { Page } from '@playwright/test';
import { PolresRow } from '../utils/expected';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

export class MasterPolresPage {
  constructor(private page: Page) {}

async open() {
  await this.page.getByRole('button', { name: 'POLRI' }).click();
  await this.page.locator('.submenus').first().click();
  await this.page.getByRole('columnheader', { name: 'Nama Pengguna' }).waitFor();
  await this.page.getByRole('combobox', { name: '10', exact: true }).click();
  await this.page.getByRole('option', { name: '100', exact: true }).click();
  await this.page.waitForLoadState('networkidle');
  await this.page.locator('p-table tbody tr').first().waitFor();
}

  // page size 100 > Polres terbanyak per Polda (38), jadi tidak perlu pagination
  async readAll(): Promise<PolresRow[]> {
    const table = this.page.locator('p-table');
    const headers = (await table.locator('thead th').allInnerTexts()).map((h) => clean(h).toUpperCase());
    const iPolres = headers.findIndex((h) => /NAMA PENGGUNA/.test(h));
    const iEmail = headers.findIndex((h) => /EMAIL/.test(h));
    if (iPolres < 0 || iEmail < 0) {
      throw new Error(`Kolom Polres/Email tidak ketemu. Header tabel: ${JSON.stringify(headers)}`);
    }

    const rows = await table.locator('tbody tr').all();
    const result: PolresRow[] = [];
    for (const row of rows) {
      const cells = (await row.locator('td').allInnerTexts()).map(clean);
      if (cells.length <= Math.max(iPolres, iEmail)) continue; // baris "no data"
      result.push({ polres: cells[iPolres], email: cells[iEmail] });
    }
    return result;
  }
}
