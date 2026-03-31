import { Context } from "grammy";
import { MESSAGES, CALLBACKS, URLS } from "../config/constants";
import { getHowToUseKeyboard, getWhyAccessKeyboard } from "../keyboards/help.keyboards";
import { getPresetGroupsKeyboard } from "../keyboards/preset.keyboards";
import { getUserState, updateUserState, editMenu } from "../utils/menu.helper";

/**
 * LOGIC: Handles "How to use" flow
 * WHY: Education and access setup
 */

export async function handleHelp(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery || !("data" in callbackQuery)) return;

  const data = callbackQuery.data;

  await ctx.answerCallbackQuery();

  switch (data) {
    case CALLBACKS.HOW_TO_USE:
      // LOGIC: Show how to use menu
      updateUserState(userId, { currentMenu: "how_to_use" });
      await editMenu(
        ctx,
        MESSAGES.HOW_TO_USE_MENU,
        getHowToUseKeyboard()
      );
      break;

    //   case CALLBACKS.GITBOOK:
    //     // WRONG: ctx.answerCallbackQuery({ url: ... })
    //     // CORRECT: Use URL button in keyboard
    //     await ctx.answerCallbackQuery({
    //       text: "Opening Gitbook..."
    //     });
    //     break;

    // case CALLBACKS.YOUTUBE:
    //   // LOGIC: Open YouTube in new tab
    //   await ctx.answerCallbackQuery({
    //     text: "Opening YouTube...",
    //     url: URLS.YOUTUBE,
    //   });
    //   break;

    case CALLBACKS.WHY_ACCESS:
      // LOGIC: Show why access explanation
      updateUserState(userId, { currentMenu: "why_access" });
      await editMenu(
        ctx,
        MESSAGES.WHY_SPYFLY_ACCESS,
        getWhyAccessKeyboard()
      );
      break;

    case CALLBACKS.AUTHORIZE_ACCESS:
      // LOGIC: Request phone number (send NEW message, user will type)
      // WHY: Needs text input
      updateUserState(userId, { currentMenu: "entering_phone" });
      
      await ctx.reply(MESSAGES.AUTH_PHONE_REQUEST);
      break;

    case CALLBACKS.USE_PRESET_GROUPS:
      // LOGIC: Show preset groups menu
      const state = getUserState(userId);
      updateUserState(userId, { currentMenu: "preset_groups" });
      
      await editMenu(
        ctx,
        MESSAGES.PRESET_GROUPS_MENU,
        getPresetGroupsKeyboard(state.isAgentMonitoring)
      );
      break;
  }
}

/**
 * LOGIC: Handle phone number input (text message, not callback)
 * WHY: User types phone number
 */
export async function handlePhoneInput(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const state = getUserState(userId);
  
  // Only process if we're expecting phone input
  if (state.currentMenu !== "entering_phone") return;

  const phoneNumber = ctx.message?.text;
  if (!phoneNumber) return;

  // LOGIC: Simulate auth request
  await ctx.reply(MESSAGES.AUTH_REQUESTING);

  // LOGIC: Simulate rate limit error (for demo/UI purposes)
  setTimeout(async () => {
    await ctx.reply(MESSAGES.AUTH_RATE_LIMIT(9));
  }, 1000);

  // Reset menu state
  updateUserState(userId, { currentMenu: "main" });
}