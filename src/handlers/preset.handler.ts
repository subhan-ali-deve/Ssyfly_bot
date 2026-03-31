import { Context } from "grammy";
import { MESSAGES, CALLBACKS, URLS } from "../config/constants";
import {
  getPresetGroupsKeyboard,
  getFreeAlphaKeyboard,
  getPremiumAlphaKeyboard,
  getAlphaWaitlistKeyboard,
} from "../keyboards/preset.keyboards";
import { getUserState, updateUserState, editMenu } from "../utils/menu.helper";

/**
 * LOGIC: Handles preset groups and subscriptions
 * WHY: Agent monitoring, free/premium subscriptions
 */

export async function handlePreset(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery || !("data" in callbackQuery)) return;

  const data = callbackQuery.data;
  const state = getUserState(userId);

  await ctx.answerCallbackQuery();

  switch (data) {
    case CALLBACKS.START_AGENT_MONITORING:
      // LOGIC: Start monitoring
      updateUserState(userId, { 
        isAgentMonitoring: true,
        currentMenu: "preset_groups",
      });
      
      await editMenu(
        ctx,
        MESSAGES.AGENT_MONITORING_STARTED,
        getPresetGroupsKeyboard(true)  // isMonitoring = true
      );
      break;

    case CALLBACKS.PAUSE_AGENT_MONITORING:
      // LOGIC: Pause monitoring
      updateUserState(userId, { 
        isAgentMonitoring: false,
        currentMenu: "preset_groups",
      });
      
      await editMenu(
        ctx,
        MESSAGES.AGENT_MONITORING_STOPPED,
        getPresetGroupsKeyboard(false)  // isMonitoring = false
      );
      break;

    case CALLBACKS.FREE_ALPHA:
      // LOGIC: Show free groups
      updateUserState(userId, { currentMenu: "free_alpha" });
      await editMenu(
        ctx,
        MESSAGES.SELECT_FREE_ALPHA,
        getFreeAlphaKeyboard()
      );
      break;

    case CALLBACKS.PREMIUM_ALPHA:
      // LOGIC: Show premium groups
      updateUserState(userId, { currentMenu: "premium_alpha" });
      await editMenu(
        ctx,
        MESSAGES.SELECT_PREMIUM_ALPHA,
        getPremiumAlphaKeyboard()
      );
      break;

    case CALLBACKS.ALPHA_WAITLIST:
      // LOGIC: Show Alpha+ payment screen
      updateUserState(userId, { currentMenu: "alpha_waitlist" });
      await editMenu(
        ctx,
        MESSAGES.ALPHA_WAITLIST,
        getAlphaWaitlistKeyboard()
      );
      
      // Send separate message for TX input
      await ctx.reply(MESSAGES.PASTE_TX_SIGNATURE);
      break;

    case CALLBACKS.OPEN_SOLSCAN:
      // LOGIC: Open Solscan in new tab
      await ctx.answerCallbackQuery({
        text: "Opening Solscan...",
        url: URLS.SOLSCAN,
      });
      break;

    case CALLBACKS.CANCEL:
      // LOGIC: Cancel and return to main menu
      // (Will be handled by MAIN_MENU callback in bot.ts)
      break;

    // Free group subscriptions
    case CALLBACKS.MOONX:
      // Example: Already subscribed
      await ctx.answerCallbackQuery({
        text: MESSAGES.ALREADY_SUBSCRIBED("SpyFly MoonX"),
        show_alert: true,
      });
      break;

    case CALLBACKS.WEBAPP_TESTS:
      // Example: New subscription
      await ctx.answerCallbackQuery({
        text: "Subscribed to webAppTests",
        show_alert: true,
      });
      
      // Send channel link as NEW message
      await ctx.reply(MESSAGES.SUBSCRIPTION_SUCCESS("webAppTests"));
      break;

    // Handle other free groups similarly...
    case CALLBACKS.VOLUME_GEMS:
    case CALLBACKS.ADS_PAID:
    case CALLBACKS.DEX_PAID:
    case CALLBACKS.TG_60_WINRATE:
    case CALLBACKS.JEFFREYS_PLAYS:
    case CALLBACKS.ALPHA_TESTS:
    case CALLBACKS.JITO_TESTS:
    case CALLBACKS.REFACTOR_TEST:
    case CALLBACKS.TEST_GROUP_33:
    case CALLBACKS.DEV_ENVIRONMENT:
      // For demo, just show popup
      await ctx.answerCallbackQuery({
        text: "Subscription feature - implement based on your needs",
        show_alert: true,
      });
      break;

    // Premium group subscriptions (placeholder)
    case CALLBACKS.SPYFLY_PRIME:
    case CALLBACKS.SUPER_ALPHA_PREMIUM:
    case CALLBACKS.RECOVERY_RADAR_PREMIUM:
      await ctx.answerCallbackQuery({
        text: "Premium subscription - implement payment logic",
        show_alert: true,
      });
      break;
  }
}