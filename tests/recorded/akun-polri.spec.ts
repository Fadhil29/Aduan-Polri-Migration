import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://10.202.0.50:4201/');
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('siber_metrojaya@cyber.polri.go.id');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(process.env.POLDA_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'POLRI ' }).click();
  await page.locator('.submenus').first().click();
  await page.locator('#pn_id_17').getByRole('button', { name: 'dropdown trigger' }).click();
  await page.getByRole('option', { name: '100' }).click();
  await page.locator('p-table').click();
});