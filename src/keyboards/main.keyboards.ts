import { InlineKeyboard } from "grammy";
import { BUTTONS, CALLBACKS } from "../config/constants";

/**
 * LOGIC: Creates button layouts using InlineKeyboard
 * WHY: Separates UI (buttons) from logic (handlers)
 * 
 * InlineKeyboard API:
 * .text("Label", "callback_data") - Creates a button
 * .row() - Moves to next row
 */

/**
 * LOGIC: Initial welcome menu - 3 buttons stacked vertically
 * WHY: New users see simple choice: channel, trading, or skip
 */
export function getInitialWelcomeKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.CHANNEL_SETUP, CALLBACKS.CHANNEL_SETUP).row()
    .text(BUTTONS.AUTOTRADING_SETUP, CALLBACKS.AUTOTRADING_SETUP).row()
    .text(BUTTONS.SKIP_TUTORIAL, CALLBACKS.SKIP_TUTORIAL);
}

/**
 * LOGIC: Returning user menu - grid layout with all features
 * WHY: Experienced users need quick access to all functions
 */
/**
 * LOGIC: Returning user menu with dynamic Start/Pause button
 * WHY: Button changes based on autotrading state
 */
export function getReturningUserKeyboard(isAutotrading: boolean = false) {
  const autotradingButton = isAutotrading 
    ? { text: BUTTONS.PAUSE_AUTOTRADING, callback: CALLBACKS.PAUSE_AUTOTRADING }
    : { text: BUTTONS.START_AUTOTRADING, callback: CALLBACKS.START_AUTOTRADING };

  return new InlineKeyboard()
    .text(autotradingButton.text, autotradingButton.callback)
    .text(BUTTONS.ADD_SOURCES, CALLBACKS.ADD_SOURCES).row()
    .text(BUTTONS.SELECT_SOURCES_AUTOTRADE, CALLBACKS.SELECT_AUTOTRADE)
    .text(BUTTONS.SELECT_SOURCES_PRIVATE, CALLBACKS.SELECT_PRIVATE).row()
    .text(BUTTONS.CREATE_SIGNAL_FEED, "create_signal_feed").row()
    .text(BUTTONS.HOW_TO_USE, CALLBACKS.HOW_TO_USE)  // ← ADD THIS
    .text(BUTTONS.JOIN_ALPHA_WAITLIST, CALLBACKS.ALPHA_WAITLIST).row()  // ← ADD THIS
    .text(BUTTONS.ACCOUNT_WALLETS, "account_wallets")
    .text(BUTTONS.POSITIONS, "positions").row()
    .text(BUTTONS.SETTINGS, "settings")
    .text(BUTTONS.SUPPORT, "support").row()
    .text(BUTTONS.BECOME_SPY, "become_spy")
    .text(BUTTONS.REFER_FRIEND, "refer_friend").row()
    .text(BUTTONS.JOIN_ALPHA_CHANNEL, "join_alpha_channel");
}