import { InlineKeyboard } from "grammy";
import { BUTTONS, CALLBACKS } from "../config/constants";

/**
 * LOGIC: Keyboards for trading setup flow
 * WHY: Trading has different steps: strategy choice, ecosystem, amounts
 */

/**
 * LOGIC: Trading intro - choose Jeffrey's preset or custom
 * WHY: Quick setup vs advanced customization
 */
export function getTradingSetupKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.JEFFREY_SETUP, CALLBACKS.JEFFREY_SETUP).row()
    .text(BUTTONS.CUSTOM_SETUP, CALLBACKS.CUSTOM_SETUP).row()
    .text(BUTTONS.BACK, CALLBACKS.BACK);
}

/**
 * LOGIC: After choosing Jeffrey's setup, show strategy details
 * WHY: User reviews preset TP/SL levels before proceeding
 */
export function getJeffreySetupKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.SET_CORE_SETUP, CALLBACKS.SET_CORE_SETUP).row()
    .text(BUTTONS.BACK, CALLBACKS.BACK);
}

/**
 * LOGIC: Choose blockchain ecosystem to trade on
 * WHY: Different networks need different settings
 */
export function getEcosystemKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.SOLANA, CALLBACKS.ECOSYSTEM_SOLANA).row()
    .text(BUTTONS.BSC, CALLBACKS.ECOSYSTEM_BSC).row()
    .text(BUTTONS.BOTH, CALLBACKS.ECOSYSTEM_BOTH).row()
    .text(BUTTONS.BACK, CALLBACKS.BACK);
}

/**
 * LOGIC: For amount input screens (SOL/BNB)
 * WHY: User will type amount, only needs back
 */
export function getAmountInputKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.BACK, CALLBACKS.BACK);
}