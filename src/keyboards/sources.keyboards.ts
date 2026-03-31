import { InlineKeyboard } from "grammy";
import { BUTTONS, CALLBACKS } from "../config/constants";
import { text } from "stream/consumers";

/**
 * LOGIC: Add sources menu (monitored/trusted/ignored)
 * WHY: User chooses how to add sources
 */
export function getAddSourcesKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.ADD_YOUR_OWN, CALLBACKS.ADD_YOUR_OWN).row()
    .text(BUTTONS.BACK, CALLBACKS.BACK);
}


/**
 * LOGIC: Source selection for autotrading
 * WHY: Shows preset sources with "More" pagination
 * @param selectedSources - Already selected source IDs
 * @param showMore - If true, shows ONLY additional sources (not all)
 */
export function getAutotradingSourcesKeyboard(
  selectedSources: string[] = [],
  showMore: boolean = false
) {
  const keyboard = new InlineKeyboard();

  const getLabel = (baseLabel: string, sourceId: string) => {
    return selectedSources.includes(sourceId) ? `${baseLabel} ✓` : baseLabel;
  };

  if (!showMore) {
    // MAIN PAGE - First 4 sources only
    keyboard
      .text(getLabel(BUTTONS.ANY_THREE, "any_three"), CALLBACKS.ANY_THREE).row()
      .text(getLabel(BUTTONS.SUPER_ALPHA, "super_alpha"), CALLBACKS.SUPER_ALPHA).row()
      .text(getLabel(BUTTONS.RECOVERY_RADAR, "recovery_radar"), CALLBACKS.RECOVERY_RADAR).row()
      .text(getLabel(BUTTONS.BSC_PLAYS, "bsc_plays"), CALLBACKS.BSC_PLAYS).row()
      .text(BUTTONS.MORE, CALLBACKS.MORE_SOURCES).row()
      .text(BUTTONS.ADD_MORE, CALLBACKS.ADD_MORE_SOURCES).row()
      .text(BUTTONS.BACK_TO_MAIN_MENU, CALLBACKS.MAIN_MENU);
  } else {
    // MORE PAGE - ONLY additional sources (no previously shown ones)
    keyboard
      .text(getLabel(BUTTONS.DOUBLE_TAP, "double_tap"), CALLBACKS.DOUBLE_TAP).row()
      .text(getLabel(BUTTONS.MOONX, "moonx"), CALLBACKS.MOONX).row()
      .text(getLabel(BUTTONS.FIRST_TWO, "first_two"), CALLBACKS.FIRST_TWO).row()
      .text(BUTTONS.PREV, CALLBACKS.PREV_SOURCES).row();  // ← Only Prev, no main sources
  }

  return keyboard;
}

/**
 * LOGIC: Source selection for private feed
 * WHY: Same as autotrading but different initial sources
 */
export function getPrivateSourcesKeyboard(
  selectedSources: string[] = [],
  showMore: boolean = false
) {
  const keyboard = new InlineKeyboard();

  const getLabel = (baseLabel: string, sourceId: string) => {
    return selectedSources.includes(sourceId) ? `${baseLabel} ✓` : baseLabel;
  };

  if (!showMore) {
    // MAIN PAGE - First 4 sources
    keyboard
      .text(getLabel(BUTTONS.SUPER_ALPHA, "super_alpha"), CALLBACKS.SUPER_ALPHA).row()
      .text(getLabel(BUTTONS.RECOVERY_RADAR, "recovery_radar"), CALLBACKS.RECOVERY_RADAR).row()
      .text(getLabel(BUTTONS.BSC_PLAYS, "bsc_plays"), CALLBACKS.BSC_PLAYS).row()
      .text(getLabel(BUTTONS.DOUBLE_TAP, "double_tap"), CALLBACKS.DOUBLE_TAP).row()
      .text(BUTTONS.MORE, CALLBACKS.MORE_SOURCES).row()
      .text(BUTTONS.ADD_MORE, CALLBACKS.ADD_MORE_SOURCES).row()
      .text(BUTTONS.BACK_TO_MAIN_MENU, CALLBACKS.MAIN_MENU);
  } else {
    // MORE PAGE - ONLY additional sources
    keyboard
      .text(getLabel(BUTTONS.ANY_THREE, "any_three"), CALLBACKS.ANY_THREE).row()
      .text(getLabel(BUTTONS.MOONX, "moonx"), CALLBACKS.MOONX).row()
      .text(getLabel(BUTTONS.FIRST_TWO, "first_two"), CALLBACKS.FIRST_TWO).row()
      .text(BUTTONS.PREV, CALLBACKS.PREV_SOURCES).row();  // ← Only Prev
  }



  return keyboard;
}

/**
 * LOGIC: Simple keyboard with just Main Menu button
 * WHY: Used after actions complete
 */
export function getMainMenuButton() {
  return new InlineKeyboard()
    .text(BUTTONS.MAIN_MENU, CALLBACKS.MAIN_MENU);
}