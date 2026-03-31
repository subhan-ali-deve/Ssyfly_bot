import { Context } from "grammy";
import { MESSAGES, CALLBACKS } from "../config/constants";
import { getMainMenuButton } from "../keyboards/sources.keyboards";
import { getUserState, updateUserState, editMenu } from "../utils/menu.helper";

/**
 * LOGIC: Handles Start/Pause autotrading
 * WHY: Toggle autotrading state and show confirmation
 */

export async function handleAutotrading(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery || !("data" in callbackQuery)) return;

  const data = callbackQuery.data;
  const state = getUserState(userId);

  await ctx.answerCallbackQuery();

  switch (data) {
    case CALLBACKS.START_AUTOTRADING:
      // LOGIC: Start autotrading
      // WHY: User clicked "Start Autotrading"
      
      updateUserState(userId, {
        isAutotrading: true,
        autotradingStartTime: new Date(),
        currentMenu: "autotrading_active",
      });

      await editMenu(
        ctx,
        MESSAGES.AUTOTRADING_STARTED,
        getMainMenuButton()
      );
      break;

    case CALLBACKS.PAUSE_AUTOTRADING:
      // LOGIC: Stop autotrading
      // WHY: User clicked "Pause Autotrading"

      const startTime = state.autotradingStartTime || new Date();
      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();

      // Calculate hours, minutes, seconds
      const hours = Math.floor(duration / (1000 * 60 * 60));
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((duration % (1000 * 60)) / 1000);

      updateUserState(userId, {
        isAutotrading: false,
        currentMenu: "autotrading_stopped",
      });

      // LOGIC: Edit message to show stopped status
      await editMenu(
        ctx,
        MESSAGES.AUTOTRADING_STOPPED,
        getMainMenuButton()
      );

      // LOGIC: Send NEW message with summary
      // WHY: This is a separate report, not part of menu flow
      await ctx.reply(MESSAGES.AUTOTRADING_SUMMARY(hours, minutes, seconds));
      break;
  }
}