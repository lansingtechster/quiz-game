const { test, expect } = require('@playwright/test');
const path = require('path');

const appUrl = `file://${path.join(__dirname, '..', 'index.html')}`;

test.describe('Animal Trivia Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(appUrl, { waitUntil: 'load' });
  });

  test('shows the welcome screen', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText(/Welcome, Quiz Master!/);
    await expect(page.locator('button', { hasText: /Start Quiz/i })).toBeVisible();
    await expect(page.locator('#welcomeScreen')).toHaveClass(/active/);
  });

  test('starts the quiz and displays the first question', async ({ page }) => {
    await page.locator('button', { hasText: /Start Quiz/i }).click();

    await expect(page.locator('#questionNumber')).toHaveText('Question 1 of 10');
    await expect(page.locator('#questionText')).not.toBeEmpty();
    await expect(page.locator('.option')).toHaveCount(4);
    await expect(page.locator('#quizScreen')).toHaveClass(/active/);
  });

  test('completes the quiz with all correct answers and shows the perfect score results', async ({ page }) => {
    await page.locator('button', { hasText: /Start Quiz/i }).click();

    const correctAnswers = await page.evaluate(() => quizData.map((item) => item.correct));

    for (let questionIndex = 0; questionIndex < correctAnswers.length; questionIndex++) {
      const answerIndex = correctAnswers[questionIndex];
      await page.locator('.option').nth(answerIndex).click();

      if (questionIndex < correctAnswers.length - 1) {
        await expect(page.locator('#questionNumber')).toHaveText(`Question ${questionIndex + 2} of 10`, {
          timeout: 5000,
        });
      }
    }

    await expect(page.locator('#finalScore')).toHaveText('10/10');
    await expect(page.locator('#percentage')).toHaveText('100%');
    await expect(page.locator('#resultEmoji')).toHaveText('🏆');
    await expect(page.locator('#resultsScreen')).toHaveClass(/active/);
  });
});
