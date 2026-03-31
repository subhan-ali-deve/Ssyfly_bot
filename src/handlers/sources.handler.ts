import { Context } from "grammy";
import { MESSAGES, CALLBACKS } from "../config/constants";
import {
  getAddSourcesKeyboard,
  getAutotradingSourcesKeyboard,
  getPrivateSourcesKeyboard,
} from "../keyboards/sources.keyboards";
import {
  getUserState,
  updateUserState,
  editMenu,
  getSourceName,
} from "../utils/menu.helper";

/**
 * LOGIC: Handles all source-related actions
 * WHY: Add sources, select for autotrading, select for private feed
 */

export async function handleSources(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery || !("data" in callbackQuery)) return;

  const data = callbackQuery.data;
  const state = getUserState(userId);

  await ctx.answerCallbackQuery();

  switch (data) {
    case CALLBACKS.ADD_SOURCES:
      // LOGIC: Show add sources menu
      updateUserState(userId, { currentMenu: "add_sources" });
      await editMenu(
        ctx,
        MESSAGES.ADD_SOURCES_MENU,
        getAddSourcesKeyboard()
      );
      break;

    case CALLBACKS.ADD_YOUR_OWN:
      // LOGIC: Prompt user to enter source name
      // WHY: This requires text input, so send NEW message
      updateUserState(userId, { currentMenu: "entering_source_name" });
      
      // Send new message (user will type response)
      await ctx.reply(MESSAGES.ADD_MONITORED_SOURCE);
      break;

    case CALLBACKS.SELECT_AUTOTRADE:
      // LOGIC: Show sources for autotrading selection
      updateUserState(userId, { currentMenu: "select_autotrade" });
      await editMenu(
        ctx,
        MESSAGES.SELECT_SOURCES_AUTOTRADE,
        getAutotradingSourcesKeyboard(state.selectedAutotradeSources, false)
      );
      break;

    case CALLBACKS.SELECT_PRIVATE:
      // LOGIC: Show sources for private feed selection
      updateUserState(userId, { currentMenu: "select_private" });
      await editMenu(
        ctx,
        MESSAGES.SELECT_SOURCES_PRIVATE,
        getPrivateSourcesKeyboard(state.selectedPrivateSources, false)
      );
      break;

    case CALLBACKS.MORE_SOURCES:
      // LOGIC: Show MORE page (pagination to next preset sources)
      // WHY: User clicked "More" button to see additional presets
      // THIS IS DIFFERENT FROM "ADD_MORE" ← KEY POINT!
      
      const isAutotrade = state.currentMenu === "select_autotrade" || 
                         state.currentMenu === "select_autotrade_more";
      
      const selectedList = isAutotrade 
        ? state.selectedAutotradeSources 
        : state.selectedPrivateSources;

      updateUserState(userId, { 
        currentMenu: isAutotrade ? "select_autotrade_more" : "select_private_more" 
      });
      
      const keyboard = isAutotrade
        ? getAutotradingSourcesKeyboard(selectedList, true)  // showMore = true
        : getPrivateSourcesKeyboard(selectedList, true);

      const moreMessage = isAutotrade 
        ? MESSAGES.SELECT_SOURCES_AUTOTRADE 
        : MESSAGES.SELECT_SOURCES_PRIVATE;

      await editMenu(ctx, moreMessage, keyboard);
      break;

    case CALLBACKS.PREV_SOURCES:
      // LOGIC: Go BACK to main source page (from more page)
      // WHY: User clicked "Prev" button from additional sources page
      
      const wasAutotrade = state.currentMenu.includes("autotrade");
      const prevSelectedList = wasAutotrade
        ? state.selectedAutotradeSources
        : state.selectedPrivateSources;

      updateUserState(userId, { 
        currentMenu: wasAutotrade ? "select_autotrade" : "select_private" 
      });

      const prevKeyboard = wasAutotrade
        ? getAutotradingSourcesKeyboard(prevSelectedList, false)  // showMore = false
        : getPrivateSourcesKeyboard(prevSelectedList, false);

      const prevMessage = wasAutotrade 
        ? MESSAGES.SELECT_SOURCES_AUTOTRADE 
        : MESSAGES.SELECT_SOURCES_PRIVATE;

      await editMenu(ctx, prevMessage, prevKeyboard);
      break;

    case CALLBACKS.SUPER_ALPHA:
    case CALLBACKS.ANY_THREE:
    case CALLBACKS.RECOVERY_RADAR:
    case CALLBACKS.BSC_PLAYS:
    case CALLBACKS.DOUBLE_TAP:
    case CALLBACKS.FIRST_TWO:
    case CALLBACKS.MOONX:
      // LOGIC: Toggle source selection
      handleSourceToggle(ctx, userId, data);
      break;

    case CALLBACKS.ADD_MORE_SOURCES:
      // LOGIC: Show ADD SOURCES menu (monitored/trusted/ignored)
      // WHY: User clicked "Add More" button to add custom sources
      // THIS IS DIFFERENT FROM "MORE" ← KEY POINT!
      // "More" = pagination, "Add More" = add custom sources menu
      
      updateUserState(userId, { currentMenu: "add_sources" });
      await editMenu(
        ctx,
        MESSAGES.ADD_SOURCES_MENU,
        getAddSourcesKeyboard()
      );
      break;
  }
}

/**
 * LOGIC: Toggle source selection
 * WHY: Add/remove source from appropriate list based on current menu
 */
async function handleSourceToggle(ctx: Context, userId: number, sourceCallback: string) {
  const state = getUserState(userId);

  const sourceMap: Record<string, string> = {
    [CALLBACKS.SUPER_ALPHA]: "super_alpha",
    [CALLBACKS.ANY_THREE]: "any_three",
    [CALLBACKS.RECOVERY_RADAR]: "recovery_radar",
    [CALLBACKS.BSC_PLAYS]: "bsc_plays",
    [CALLBACKS.DOUBLE_TAP]: "double_tap",
    [CALLBACKS.FIRST_TWO]: "first_two",
    [CALLBACKS.MOONX]: "moonx",
  };

  const sourceId = sourceMap[sourceCallback];
  const sourceName = getSourceName(sourceId);

  // LOGIC: Check if on autotrade or private feed menu
  const isAutotrade = state.currentMenu.includes("autotrade");
  const selectedList = isAutotrade 
    ? state.selectedAutotradeSources 
    : state.selectedPrivateSources;

  // Toggle selection
  const index = selectedList.indexOf(sourceId);
  if (index > -1) {
    selectedList.splice(index, 1);
  } else {
    selectedList.push(sourceId);
  }

  // Update state
  if (isAutotrade) {
    updateUserState(userId, { selectedAutotradeSources: selectedList });
  } else {
    updateUserState(userId, { selectedPrivateSources: selectedList });
  }

  // LOGIC: Check if on "more" page
  // WHY: Need to show correct keyboard (main page or more page)
  const showMore = state.currentMenu.includes("_more");
  
  const keyboard = isAutotrade
    ? getAutotradingSourcesKeyboard(selectedList, showMore)
    : getPrivateSourcesKeyboard(selectedList, showMore);

  // Show confirmation with updated keyboard
  const confirmationText = `${sourceName} updated!`;
  await editMenu(ctx, confirmationText, keyboard);
}