import { test, expect } from '@playwright/test';
import { poldaList, norm } from '../../utils/expected';
import { loginAs } from '../../utils/login';
import { MasterPolresPage } from '../../pages/MasterPolresPage';

for (const p of poldaList) {
  test.describe(p.polda, () => {
    test.skip(!p.loginEmail, 'Polda tidak punya akun di sheet "Akun Polda" Excel');

    test('master data Polres sesuai Excel', async ({ page }) => {
      await loginAs(page, p.loginEmail!);
      const master = new MasterPolresPage(page);
      await master.open();
      const actual = await master.readAll();

      const key = (r: { polres: string; email: string }) => `${norm(r.polres)}|${r.email.trim().toLowerCase()}`;
      const actualSet = new Set(actual.map(key));
      const expectedSet = new Set(p.polres.map(key));

      const missing = p.polres.filter((r) => !actualSet.has(key(r)));
      const extra = actual.filter((r) => !expectedSet.has(key(r)));

      expect.soft(actual.length, 'jumlah baris vs Excel').toBe(p.polres.length);
      expect.soft(missing, 'ada di Excel, tidak ada di datatable (belum masuk / email beda)').toEqual([]);
      expect.soft(extra, 'ada di datatable, tidak ada di Excel (nyasar dari Polda lain?)').toEqual([]);
    });
  });
}
