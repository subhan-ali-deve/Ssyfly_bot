import { Bot } from "grammy";
import dotenv from "dotenv";
import { handleStart } from "./handlers/start.handler";
import { handleChannelSetup } from "./handlers/channel.handler";
import { handleTradingSetup } from "./handlers/trading.handler";
import { CALLBACKS, MESSAGES } from "./config/constants";
import { goBack, getUserState, editMenu, updateUserState } from "./utils/menu.helper";
import { getInitialWelcomeKeyboard } from "./keyboards/main.keyboards";
import { 
  getChannelSetupInitialKeyboard, 
  getSourceSelectionKeyboard, 
  getMoreSourcesKeyboard, 
  getAddCustomSourcesKeyboard, 
  getAuthInfoKeyboard 
} from "./keyboards/channel.keyboards";
import { 
  getTradingSetupKeyboard, 
  getJeffreySetupKeyboard, 
  getEcosystemKeyboard 
} from "./keyboards/trading.keyboards";
import { getReturningUserKeyboard } from "./keyboards/main.keyboards";


/**
 * MAIN BOT FILE
 * 
 * LOGIC: This is the orchestrator - connects all parts
 * WHY: 
 * - Creates bot instance
 * - Registers command handlers
 * - Registers callback handlers (button clicks)
 * - Handles back navigation
 * - Starts the bot
 */

// Load .env file
dotenv.config();

// Create bot instance
const bot = new Bot(process.env.BOT_TOKEN || "");

/**
 * ============================================
 * COMMAND HANDLERS
 * ============================================
 */

// LOGIC: /start command
// WHY: Entry point for all users
bot.command("start", handleStart);

/**
 * ============================================
 * CALLBACK QUERY HANDLERS (Button Clicks)
 * ============================================
 * 
 * LOGIC: When user clicks button, Telegram sends "callback query"
 * WHY: We need to catch it and route to appropriate handler
 * 
 * Pattern: bot.callbackQuery("callback_data", handlerFunction)
 */

// Channel setup flow callbacks
bot.callbackQuery(CALLBACKS.CHANNEL_SETUP, handleChannelSetup);
bot.callbackQuery(CALLBACKS.SELECT_SOURCE, handleChannelSetup);
bot.callbackQuery(CALLBACKS.SUPER_ALPHA, handleChannelSetup);
bot.callbackQuery(CALLBACKS.ANY_THREE, handleChannelSetup);
bot.callbackQuery(CALLBACKS.RECOVERY_RADAR, handleChannelSetup);
bot.callbackQuery(CALLBACKS.BSC_PLAYS, handleChannelSetup);
bot.callbackQuery(CALLBACKS.DOUBLE_TAP, handleChannelSetup);
bot.callbackQuery(CALLBACKS.FIRST_TWO, handleChannelSetup);
bot.callbackQuery(CALLBACKS.MOONX, handleChannelSetup);
bot.callbackQuery(CALLBACKS.MORE_SOURCES, handleChannelSetup);
bot.callbackQuery(CALLBACKS.PREV_SOURCES, handleChannelSetup);
bot.callbackQuery(CALLBACKS.CONTINUE_ONBOARDING, handleChannelSetup);
bot.callbackQuery(CALLBACKS.ADD_OWN_SOURCES, handleChannelSetup);
bot.callbackQuery(CALLBACKS.CONTINUE_AUTH, handleChannelSetup);
bot.callbackQuery(CALLBACKS.SKIP_CHANNEL_SETUP, handleChannelSetup);

// Trading setup flow callbacks
bot.callbackQuery(CALLBACKS.AUTOTRADING_SETUP, handleTradingSetup);
bot.callbackQuery(CALLBACKS.JEFFREY_SETUP, handleTradingSetup);
bot.callbackQuery(CALLBACKS.CUSTOM_SETUP, handleTradingSetup);
bot.callbackQuery(CALLBACKS.SET_CORE_SETUP, handleTradingSetup);
bot.callbackQuery(CALLBACKS.ECOSYSTEM_SOLANA, handleTradingSetup);
bot.callbackQuery(CALLBACKS.ECOSYSTEM_BSC, handleTradingSetup);
bot.callbackQuery(CALLBACKS.ECOSYSTEM_BOTH, handleTradingSetup);

// Skip tutorial
// Skip tutorial - EDIT the message instead of sending new one
bot.callbackQuery(CALLBACKS.SKIP_TUTORIAL, async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  await ctx.answerCallbackQuery();
  
  // Mark user as "returning" (they've seen the tutorial)
  updateUserState(userId, { isReturningUser: true });
  
  // Edit message to show full menu
  await ctx.editMessageCaption({
    caption: MESSAGES.RETURNING_WELCOME,
    reply_markup: getReturningUserKeyboard(),
  });
});

/**
 * ============================================
 * BACK BUTTON HANDLER (The Navigation Magic!)
 * ============================================
 * 
 * LOGIC: Universal back button handler
 * WHY: Works for ALL menus - just maps menu name to its keyboard
 * 
 * FLOW:
 * 1. User clicks back
 * 2. Pop previous menu from history
 * 3. Look up that menu's keyboard in menuMap
 * 4. Edit message to show that menu
 */
bot.callbackQuery(CALLBACKS.BACK, async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  await ctx.answerCallbackQuery();

  // LOGIC: Get where user came from
  const previousMenu = goBack(userId);
  const state = getUserState(userId);

  // LOGIC: Map menu names to their content
  // WHY: Need to know what to show for each menu
  const menuMap: Record<string, { text: string; keyboard: any }> = {
    main: {
      text: MESSAGES.INITIAL_WELCOME,
      keyboard: getInitialWelcomeKeyboard(),
    },
    channel_setup: {
      text: MESSAGES.CHANNEL_SELECT_SOURCES,
      keyboard: getChannelSetupInitialKeyboard(),
    },
    select_sources: {
      text: MESSAGES.CHANNEL_SELECT_PROMPT,
      keyboard: getSourceSelectionKeyboard(state.selectedSources),
    },
    more_sources: {
      text: "Select a source below to monitor:",
      keyboard: getMoreSourcesKeyboard(state.selectedSources),
    },
    add_custom_sources: {
      text: MESSAGES.CHANNEL_ADD_CUSTOM,
      keyboard: getAddCustomSourcesKeyboard(),
    },
    auth_info: {
      text: MESSAGES.CHANNEL_AUTH_INFO,
      keyboard: getAuthInfoKeyboard(),
    },
    trading_setup: {
      text: MESSAGES.TRADING_INTRO,
      keyboard: getTradingSetupKeyboard(),
    },
    jeffrey_setup: {
      text: MESSAGES.TRADING_JEFFREY_SETUP,
      keyboard: getJeffreySetupKeyboard(),
    },
    ecosystem_selection: {
      text: MESSAGES.TRADING_ECOSYSTEM,
      keyboard: getEcosystemKeyboard(),
    },
  };

  // LOGIC: Get the menu config and display it
  const menu = menuMap[previousMenu];
  if (menu) {
    await editMenu(ctx, menu.text, menu.keyboard);
  }
});

/**
 * ============================================
 * ERROR HANDLER
 * ============================================
 */
bot.catch((err) => {
  console.error("Bot error:", err);
});

/**
 * ============================================
 * START THE BOT
 * ============================================
 */
console.log("🤖 Bot is starting...");
bot.start({
  onStart: () => {
    console.log("✅ Bot is running!");
    console.log("📱 Send /start to your bot to test it");
  },
});