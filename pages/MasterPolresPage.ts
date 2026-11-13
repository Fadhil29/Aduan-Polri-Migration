import { Page } from '@playwright/test';
import { PolresRow } from '../utils/expected';

export class MasterPolresPage {
  constructor(private page: Page) {}

  async open() {
    // TODO: tempel navigasi menu master data dari hasil codegen
    throw new Error('belum diisi, tempel hasil codegen');
  }

  // baca SEMUA baris datatable (set page size max + loop next sampai habis)
  async readAll(): Promise<PolresRow[]> {
    // TODO: tempel locator tabel dari hasil codegen
    throw new Error('belum diisi, tempel hasil codegen');
  }
}
