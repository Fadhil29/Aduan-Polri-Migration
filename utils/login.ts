import { Page } from '@playwright/test';

export async function loginAs(page: Page, email: string, maxAttempts = 5) {
  await page.goto(process.env.LOGIN_URL || '/');
  const menu = page.getByRole('button', { name: 'POLRI' });
  const popup = page.getByText('reCAPTCHA gagal diverifikasi');

  for (let i = 1; i <= maxAttempts; i++) {
    await page.getByRole('textbox', { name: 'Enter your email' }).fill(email);
    await page.getByRole('textbox', { name: 'Enter your password' }).fill(process.env.POLDA_PASSWORD!);
    await page.getByRole('button', { name: 'Login' }).click();

    await menu.or(popup).first().waitFor({ timeout: 15_000 });
    if (await menu.isVisible()) return;

    await page.getByRole('button', { name: 'OK', exact: true }).click();
    await popup.waitFor({ state: 'hidden' });
  }
  throw new Error(`Login ${email} gagal setelah ${maxAttempts}x percobaan (reCAPTCHA)`);
}