import { Context } from "grammy";
import { MESSAGES } from "../config/constants";
import { getInitialWelcomeKeyboard, getReturningUserKeyboard } from "../keyboards/main.keyboards";
import { getUserState, updateUserState, sendPhotoMenu } from "../utils/menu.helper";
import path from "path";

/**
 * LOGIC: Handles /start command
 * WHY: Entry point for bot - different experience for new vs returning users
 * 
 * FLOW:
 * 1. Get user state
 * 2. Check if new or returning
 * 3. New: Show image + simple 3-button menu
 * 4. Returning: Show full feature grid
 */

export async function handleStart(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const state = getUserState(userId);

  // Reset to main menu (clear navigation history)
  updateUserState(userId, {
    currentMenu: "main",
    previousMenu: [],
  });

  if (state.isReturningUser) {
    // LOGIC: Returning user - show full menu
    // WHY: They know the bot, give them all options
    await ctx.reply(MESSAGES.RETURNING_WELCOME, {
      reply_markup: getReturningUserKeyboard(),
    });
  } else {
    // LOGIC: New user - show image with 3 buttons
    // WHY: Simpler onboarding, not overwhelming
    const imagePath = path.join(__dirname, "../assets/images/welcome.jpg");
    
    try {
      await sendPhotoMenu(
        ctx,
        imagePath,
        MESSAGES.INITIAL_WELCOME,
        getInitialWelcomeKeyboard()
      );
    } catch (error) {
      // Fallback: If image not found, send as text
      await ctx.reply(MESSAGES.INITIAL_WELCOME, {
        reply_markup: getInitialWelcomeKeyboard(),
      });
    }

    // Mark as returning user for next time
    updateUserState(userId, { isReturningUser: true });
  }
}