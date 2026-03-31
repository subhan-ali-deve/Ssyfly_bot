import { InlineKeyboard } from "grammy";
import { BUTTONS, CALLBACKS, URLS } from "../config/constants";

/**
 * LOGIC: How to use menu
 * WHY: Shows resources for learning SpyFly
 */
export function getHowToUseKeyboard() {
    return new InlineKeyboard()
      .url(BUTTONS.GITBOOK, URLS.GITBOOK).row()  // ← url() not text()
      .url(BUTTONS.YOUTUBE, URLS.YOUTUBE).row()  // ← url() not text()
      .text(BUTTONS.WHY_ACCESS, CALLBACKS.WHY_ACCESS).row()
      .text(BUTTONS.BACK_TO_MAIN_MENU, CALLBACKS.MAIN_MENU);
  }

/**
 * LOGIC: Why access menu
 * WHY: Explains Telegram access + gives auth options
 */
export function getWhyAccessKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.AUTHORIZE_ACCESS, CALLBACKS.AUTHORIZE_ACCESS).row()
    .text(BUTTONS.USE_PRESET_GROUPS, CALLBACKS.USE_PRESET_GROUPS).row()
    .text(BUTTONS.BACK_TO_MAIN_MENU, CALLBACKS.MAIN_MENU);
}