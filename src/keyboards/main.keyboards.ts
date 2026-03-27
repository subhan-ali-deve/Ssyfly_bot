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
export function getReturningUserKeyboard() {
  return new InlineKeyboard()
    .text(BUTTONS.START_AUTOTRADING, "start_autotrading")
    .text(BUTTONS.ADD_SOURCES, "add_sources").row()
    .text(BUTTONS.SELECT_SOURCES_AUTOTRADE, "select_autotrade")
    .text(BUTTONS.SELECT_SOURCES_PRIVATE, "select_private").row()
    .text(BUTTONS.CREATE_SIGNAL_FEED, "create_signal_feed").row()
    .text(BUTTONS.HOW_TO_USE, "how_to_use")
    .text(BUTTONS.JOIN_ALPHA_WAITLIST, "alpha_waitlist").row()
    .text(BUTTONS.ACCOUNT_WALLETS, "account_wallets")
    .text(BUTTONS.POSITIONS, "positions").row()
    .text(BUTTONS.SETTINGS, "settings")
    .text(BUTTONS.SUPPORT, "support").row()
    .text(BUTTONS.BECOME_SPY, "become_spy")
    .text(BUTTONS.REFER_FRIEND, "refer_friend").row()
    .text(BUTTONS.JOIN_ALPHA_CHANNEL, "join_alpha_channel");
}