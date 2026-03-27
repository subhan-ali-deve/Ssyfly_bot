import { InlineKeyboard } from "grammy";
import { BUTTONS, CALLBACKS } from "../config/constants";

/**
 * LOGIC: Keyboards for channel setup flow
 * WHY: Each step needs different buttons
 */

/**
 * LOGIC: Step 1 after clicking "Channel Setup"
 * WHY: Show "Select source to monitor" button + back
 */
export function getChannelSetupInitialKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.SELECT_SOURCE, CALLBACKS.SELECT_SOURCE).row()
    .text(BUTTONS.BACK, CALLBACKS.BACK);
}

/**
 * LOGIC: Source selection menu - shows first 4 preset sources
 * WHY: User picks which sources to monitor
 * 
 * @param selectedSources - Array of source IDs already selected (for checkmarks)
 */
export function getSourceSelectionKeyboard(selectedSources: string[] = []) {
  const keyboard = new InlineKeyboard();

  // Helper: Add checkmark if source is selected
  const getLabel = (baseLabel: string, sourceId: string) => {
    return selectedSources.includes(sourceId) ? `${baseLabel} ✓` : baseLabel;
  };

  keyboard
    .text(getLabel(BUTTONS.SUPER_ALPHA, "super_alpha"), CALLBACKS.SUPER_ALPHA).row()
    .text(getLabel(BUTTONS.ANY_THREE, "any_three"), CALLBACKS.ANY_THREE).row()
    .text(getLabel(BUTTONS.RECOVERY_RADAR, "recovery_radar"), CALLBACKS.RECOVERY_RADAR).row()
    .text(getLabel(BUTTONS.BSC_PLAYS, "bsc_plays"), CALLBACKS.BSC_PLAYS).row()
    .text(BUTTONS.MORE, CALLBACKS.MORE_SOURCES).row()
    .text(BUTTONS.CONTINUE_ONBOARDING, CALLBACKS.CONTINUE_ONBOARDING).row()
    .text(BUTTONS.BACK, CALLBACKS.BACK);

  return keyboard;
}

/**
 * LOGIC: "More" sources page - shows additional sources + selected ones from main page
 * WHY: Too many sources to fit on one screen
 */
export function getMoreSourcesKeyboard(selectedSources: string[] = []) {
  const keyboard = new InlineKeyboard();

  const getLabel = (baseLabel: string, sourceId: string) => {
    return selectedSources.includes(sourceId) ? `${baseLabel} ✓` : baseLabel;
  };

  // Show previously selected sources at top
  if (selectedSources.includes("super_alpha")) {
    keyboard.text(getLabel(BUTTONS.SUPER_ALPHA, "super_alpha"), CALLBACKS.SUPER_ALPHA).row();
  }
  if (selectedSources.includes("any_three")) {
    keyboard.text(getLabel(BUTTONS.ANY_THREE, "any_three"), CALLBACKS.ANY_THREE).row();
  }
  if (selectedSources.includes("recovery_radar")) {
    keyboard.text(getLabel(BUTTONS.RECOVERY_RADAR, "recovery_radar"), CALLBACKS.RECOVERY_RADAR).row();
  }
  if (selectedSources.includes("bsc_plays")) {
    keyboard.text(getLabel(BUTTONS.BSC_PLAYS, "bsc_plays"), CALLBACKS.BSC_PLAYS).row();
  }

  // Additional sources
  keyboard
    .text(getLabel(BUTTONS.DOUBLE_TAP, "double_tap"), CALLBACKS.DOUBLE_TAP).row()
    .text(getLabel(BUTTONS.FIRST_TWO, "first_two"), CALLBACKS.FIRST_TWO).row()
    .text(getLabel(BUTTONS.MOONX, "moonx"), CALLBACKS.MOONX).row()
    .text(BUTTONS.PREV, CALLBACKS.PREV_SOURCES).row()
    .text(BUTTONS.CONTINUE_ONBOARDING, CALLBACKS.CONTINUE_ONBOARDING).row()
    .text(BUTTONS.BACK, CALLBACKS.BACK);

  return keyboard;
}

/**
 * LOGIC: Add custom sources screen
 * WHY: After preset sources, offer to add their own channels
 */
export function getAddCustomSourcesKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.ADD_OWN_SOURCES, CALLBACKS.ADD_OWN_SOURCES).row()
    .text(BUTTONS.SKIP_SETUP, CALLBACKS.SKIP_CHANNEL_SETUP).row()
    .text(BUTTONS.BACK, CALLBACKS.BACK);
}

/**
 * LOGIC: Auth info screen explaining why we need access
 * WHY: Transparency before asking for Telegram auth
 */
export function getAuthInfoKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.DO_YOU_WISH_CONTINUE, CALLBACKS.CONTINUE_AUTH).row()
    .text(BUTTONS.BACK, CALLBACKS.BACK);
}

/**
 * LOGIC: Phone number input screen - just back button
 * WHY: User will type phone number, only needs back option
 */
export function getPhoneInputKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.BACK, CALLBACKS.BACK);
}