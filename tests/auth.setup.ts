import { test as setup } from '@playwright/test';

setup('login', async ({ page }) => {
  await page.goto(process.env.LOGIN_URL || '/');
  // TODO: ganti locator sesuai halaman login (hasil codegen)
  await page.getByLabel(/username|email/i).fill(process.env.USERNAME!);
  await page.getByLabel(/password/i).fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: /login|masuk/i }).click();
  await page.waitForLoadState('networkidle');
  await page.context().storageState({ path: '.auth/user.json' });
});
