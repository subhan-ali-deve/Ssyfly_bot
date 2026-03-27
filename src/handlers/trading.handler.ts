import { Context } from "grammy";
import { MESSAGES, CALLBACKS } from "../config/constants";
import {
  getTradingSetupKeyboard,
  getJeffreySetupKeyboard,
  getEcosystemKeyboard,
  getAmountInputKeyboard,
} from "../keyboards/trading.keyboards";
import {
  getUserState,
  updateUserState,
  editMenu,
} from "../utils/menu.helper";

/**
 * LOGIC: Handles all trading setup flow callbacks
 * WHY: Configure trading strategy, ecosystem, and amounts
 * 
 * FLOW:
 * autotrading_setup → jeffrey/custom_setup → set_core_setup 
 * → ecosystem selection → amount input
 */

export async function handleTradingSetup(ctx: Context) {
  const userId = ctx.from?.id;
  if (!userId) return;

  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery || !("data" in callbackQuery)) return;

  const data = callbackQuery.data;
  const state = getUserState(userId);

  await ctx.answerCallbackQuery();

  switch (data) {
    case CALLBACKS.AUTOTRADING_SETUP:
      // LOGIC: User clicked "Autotrading Setup" from main menu
      // WHY: Start trading configuration
      updateUserState(userId, { currentMenu: "trading_setup" });
      await editMenu(
        ctx,
        MESSAGES.TRADING_INTRO,
        getTradingSetupKeyboard()
      );
      break;

    case CALLBACKS.JEFFREY_SETUP:
      // LOGIC: User chose Jeffrey's preset strategy
      // WHY: Quick setup with predefined TP/SL levels
      updateUserState(userId, {
        currentMenu: "jeffrey_setup",
        tradingSetup: { ...state.tradingSetup, setupType: "jeffrey" },
      });
      await editMenu(
        ctx,
        MESSAGES.TRADING_JEFFREY_SETUP,
        getJeffreySetupKeyboard()
      );
      break;

    case CALLBACKS.CUSTOM_SETUP:
      // LOGIC: User wants custom TP levels
      // WHY: Advanced users want full control
      updateUserState(userId, {
        currentMenu: "custom_setup",
        tradingSetup: { ...state.tradingSetup, setupType: "custom" },
      });
      await editMenu(
        ctx,
        MESSAGES.TRADING_CUSTOM_TP,
        getAmountInputKeyboard()
      );
      break;

    case CALLBACKS.SET_CORE_SETUP:
      // LOGIC: User reviewed Jeffrey's strategy, ready to continue
      // WHY: Now choose which blockchain to trade on
      updateUserState(userId, { currentMenu: "ecosystem_selection" });
      await editMenu(
        ctx,
        MESSAGES.TRADING_ECOSYSTEM,
        getEcosystemKeyboard()
      );
      break;

    case CALLBACKS.ECOSYSTEM_SOLANA:
      // LOGIC: User chose Solana only
      // WHY: Need SOL amount for trades
      updateUserState(userId, {
        currentMenu: "sol_amount",
        tradingSetup: { ...state.tradingSetup, ecosystem: "solana" },
      });
      await editMenu(
        ctx,
        MESSAGES.TRADING_SOL_AMOUNT(state.tradingSetup?.solAmount || 0.1),
        getAmountInputKeyboard()
      );
      break;

    case CALLBACKS.ECOSYSTEM_BSC:
      // LOGIC: User chose BSC only
      // WHY: Need BNB amount for trades
      updateUserState(userId, {
        currentMenu: "bnb_amount",
        tradingSetup: { ...state.tradingSetup, ecosystem: "bsc" },
      });
      await editMenu(
        ctx,
        MESSAGES.TRADING_BNB_AMOUNT(state.tradingSetup?.bnbAmount || 0.02),
        getAmountInputKeyboard()
      );
      break;

    case CALLBACKS.ECOSYSTEM_BOTH:
      // LOGIC: User chose both Solana and BSC
      // WHY: Need amounts for both, start with SOL
      updateUserState(userId, {
        currentMenu: "sol_amount_both",
        tradingSetup: { ...state.tradingSetup, ecosystem: "both" },
      });
      await editMenu(
        ctx,
        MESSAGES.TRADING_SOL_AMOUNT(state.tradingSetup?.solAmount || 0.1),
        getAmountInputKeyboard()
      );
      break;
  }
}