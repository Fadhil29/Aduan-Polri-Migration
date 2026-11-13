import { Page } from '@playwright/test';

export async function loginAs(page: Page, email: string) {
  await page.goto(process.env.LOGIN_URL || '/');
  // TODO: ganti locator dengan hasil codegen halaman login
  await page.getByLabel(/username|email/i).fill(email);
  await page.getByLabel(/password/i).fill(process.env.POLDA_PASSWORD!);
  await page.getByRole('button', { name: /login|masuk/i }).click();
  await page.waitForLoadState('networkidle');
}
