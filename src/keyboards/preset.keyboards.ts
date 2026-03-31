import { InlineKeyboard } from "grammy";
import { BUTTONS, CALLBACKS, URLS } from "../config/constants";

/**
 * LOGIC: Preset groups main menu
 * WHY: Shows agent monitoring toggle + subscription options
 * @param isMonitoring - If true, shows "Pause", else shows "Start"
 */
export function getPresetGroupsKeyboard(isMonitoring: boolean = false) {
  const monitorButton = isMonitoring
    ? { text: BUTTONS.PAUSE_AGENT_MONITORING, callback: CALLBACKS.PAUSE_AGENT_MONITORING }
    : { text: BUTTONS.START_AGENT_MONITORING, callback: CALLBACKS.START_AGENT_MONITORING };

  return new InlineKeyboard()
    .text(monitorButton.text, monitorButton.callback).row()
    .text(BUTTONS.MY_PRESET_GROUPS, CALLBACKS.MY_PRESET_GROUPS).row()
    .text(BUTTONS.FREE_ALPHA, CALLBACKS.FREE_ALPHA).row()
    .text(BUTTONS.PREMIUM_ALPHA, CALLBACKS.PREMIUM_ALPHA).row()
    .text(BUTTONS.BACK_TO_MAIN_MENU, CALLBACKS.MAIN_MENU);
}

/**
 * LOGIC: Free Alpha groups selection
 * WHY: Shows list of free groups to subscribe
 */
export function getFreeAlphaKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.VOLUME_GEMS, CALLBACKS.VOLUME_GEMS).row()
    .text(BUTTONS.ANY_THREE, CALLBACKS.ANY_THREE).row()
    .text(BUTTONS.ADS_PAID, CALLBACKS.ADS_PAID).row()
    .text(BUTTONS.DEX_PAID, CALLBACKS.DEX_PAID).row()
    .text(BUTTONS.TG_60_WINRATE, CALLBACKS.TG_60_WINRATE).row()
    .text(BUTTONS.DOUBLE_TAP, CALLBACKS.DOUBLE_TAP).row()
    .text(BUTTONS.FIRST_TWO, CALLBACKS.FIRST_TWO).row()
    .text(BUTTONS.BSC_PLAYS, CALLBACKS.BSC_PLAYS).row()
    .text(BUTTONS.JEFFREYS_PLAYS, CALLBACKS.JEFFREYS_PLAYS).row()
    .text(BUTTONS.ALPHA_TESTS, CALLBACKS.ALPHA_TESTS).row()
    .text(BUTTONS.JITO_TESTS, CALLBACKS.JITO_TESTS).row()
    .text(BUTTONS.REFACTOR_TEST, CALLBACKS.REFACTOR_TEST).row()
    .text(BUTTONS.TEST_GROUP_33, CALLBACKS.TEST_GROUP_33).row()
    .text(BUTTONS.MOONX, CALLBACKS.MOONX).row()
    .text(BUTTONS.DEV_ENVIRONMENT, CALLBACKS.DEV_ENVIRONMENT).row()
    .text(BUTTONS.WEBAPP_TESTS, CALLBACKS.WEBAPP_TESTS).row()
    .text(BUTTONS.BACK, CALLBACKS.BACK);
}

/**
 * LOGIC: Premium Alpha groups selection
 * WHY: Shows list of premium groups to subscribe
 */
export function getPremiumAlphaKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.SPYFLY_PRIME, CALLBACKS.SPYFLY_PRIME).row()
    .text(BUTTONS.SUPER_ALPHA_PREMIUM, CALLBACKS.SUPER_ALPHA_PREMIUM).row()
    .text(BUTTONS.RECOVERY_RADAR_PREMIUM, CALLBACKS.RECOVERY_RADAR_PREMIUM).row()
    .text(BUTTONS.BACK, CALLBACKS.BACK);
}

/**
 * LOGIC: Alpha+ Waitlist payment screen
 * WHY: Shows Solscan link + cancel option
 */
export function getAlphaWaitlistKeyboard() {
    return new InlineKeyboard()
      .url(BUTTONS.OPEN_SOLSCAN, URLS.SOLSCAN).row()  // ← url() not text()
      .text(BUTTONS.CANCEL, CALLBACKS.CANCEL);
  }