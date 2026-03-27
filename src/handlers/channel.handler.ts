import { Context } from "grammy";
import { MESSAGES, CALLBACKS } from "../config/constants";
import {
  getChannelSetupInitialKeyboard,
  getSourceSelectionKeyboard,
  getMoreSourcesKeyboard,
  getAddCustomSourcesKeyboard,
  getAuthInfoKeyboard,
  getPhoneInputKeyboard,
} from "../keyboards/channel.keyboards";
import {
  getUserState,
  updateUserState,
  editMenu,
  toggleSource,
  getSourceName,
} from "../utils/menu.helper";

/**
 * LOGIC: Handles all channel setup flow callbacks
 * WHY: Centralized handler for source selection, navigation, auth
 * 
 * FLOW:
 * channel_setup → select_source → (click sources) → continue_onboarding 
 * → add_own_sources → continue_auth → phone_input
 */

export async function handleChannelSetup(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery || !("data" in callbackQuery)) return;

  const data = callbackQuery.data;
  const state = getUserState(userId);

  // CRITICAL: Always answer callback to remove loading state
  await ctx.answerCallbackQuery();

  switch (data) {
    case CALLBACKS.CHANNEL_SETUP:
      // LOGIC: User clicked "Channel Setup" from main menu
      // WHY: Start channel flow, show initial screen
      updateUserState(userId, { currentMenu: "channel_setup" });
      await editMenu(
        ctx,
        MESSAGES.CHANNEL_SELECT_SOURCES,
        getChannelSetupInitialKeyboard()
      );
      break;

    case CALLBACKS.SELECT_SOURCE:
      // LOGIC: User clicked "Select source to monitor"
      // WHY: Show list of preset sources
      updateUserState(userId, { currentMenu: "select_sources" });
      await editMenu(
        ctx,
        MESSAGES.CHANNEL_SELECT_PROMPT,
        getSourceSelectionKeyboard(state.selectedSources)
      );
      break;

    case CALLBACKS.SUPER_ALPHA:
    case CALLBACKS.ANY_THREE:
    case CALLBACKS.RECOVERY_RADAR:
    case CALLBACKS.BSC_PLAYS:
    case CALLBACKS.DOUBLE_TAP:
    case CALLBACKS.FIRST_TWO:
    case CALLBACKS.MOONX:
      // LOGIC: User clicked a source to toggle it
      // WHY: Add/remove from selection, show confirmation
      handleSourceToggle(ctx, userId, data);
      break;

    case CALLBACKS.MORE_SOURCES:
      // LOGIC: User clicked "More" to see additional sources
      // WHY: Paginate sources (too many for one screen)
      updateUserState(userId, { currentMenu: "more_sources" });
      await editMenu(
        ctx,
        "Select a source below to monitor:",
        getMoreSourcesKeyboard(state.selectedSources)
      );
      break;

    case CALLBACKS.PREV_SOURCES:
      // LOGIC: User clicked "Prev" from more sources page
      // WHY: Go back to main source list
      updateUserState(userId, { currentMenu: "select_sources" });
      await editMenu(
        ctx,
        MESSAGES.CHANNEL_SELECT_PROMPT,
        getSourceSelectionKeyboard(state.selectedSources)
      );
      break;

    case CALLBACKS.CONTINUE_ONBOARDING:
      // LOGIC: User finished selecting preset sources
      // WHY: Move to custom sources step
      updateUserState(userId, { currentMenu: "add_custom_sources" });
      await editMenu(
        ctx,
        MESSAGES.CHANNEL_ADD_CUSTOM,
        getAddCustomSourcesKeyboard()
      );
      break;

    case CALLBACKS.ADD_OWN_SOURCES:
      // LOGIC: User wants to add their own channels
      // WHY: Need Telegram auth, explain why first
      updateUserState(userId, { currentMenu: "auth_info" });
      await editMenu(
        ctx,
        MESSAGES.CHANNEL_AUTH_INFO,
        getAuthInfoKeyboard()
      );
      break;

    case CALLBACKS.CONTINUE_AUTH:
      // LOGIC: User agreed to auth
      // WHY: Request phone number for Telegram auth
      updateUserState(userId, { currentMenu: "phone_input" });
      await editMenu(
        ctx,
        MESSAGES.CHANNEL_AUTH_PHONE,
        getPhoneInputKeyboard()
      );
      break;

    case CALLBACKS.SKIP_CHANNEL_SETUP:
      // LOGIC: User skipped custom sources
      // WHY: Can continue with preset sources only
      await ctx.reply("Channel setup skipped! ✓");
      break;
  }
}

/**
 * LOGIC: Toggle source selection and show confirmation
 * WHY: User clicks source → toggle it → show "updated!" message
 * 
 * FLOW:
 * 1. Map callback to source ID
 * 2. Toggle in user state
 * 3. Get human-readable name
 * 4. Show confirmation with updated keyboard (checkmarks)
 */
async function handleSourceToggle(ctx: Context, userId: number, sourceCallback: string) {
  const state = getUserState(userId);
  
  // Map callback data to source ID
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
  const updatedSources = toggleSource(userId, sourceId);
  const sourceName = getSourceName(sourceId);

  // LOGIC: Show confirmation text
  const confirmationText = `${sourceName} updated!`;

  // LOGIC: Determine which keyboard to show
  // WHY: If on "more" page, show more keyboard; else main keyboard
  const keyboard = state.currentMenu === "more_sources"
    ? getMoreSourcesKeyboard(updatedSources)
    : getSourceSelectionKeyboard(updatedSources);

  await editMenu(ctx, confirmationText, keyboard);
}