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
import { handleSources } from "./handlers/sources.handler";
import { handleAutotrading } from "./handlers/autotrading.handler";
import { getAddSourcesKeyboard, getAutotradingSourcesKeyboard, getPrivateSourcesKeyboard } from "./keyboards/sources.keyboards";
import { handleHelp, handlePhoneInput } from "./handlers/help.handler";
import { handlePreset } from "./handlers/preset.handler";
import { getHowToUseKeyboard, getWhyAccessKeyboard } from "./keyboards/help.keyboards";
import { getPresetGroupsKeyboard, getFreeAlphaKeyboard, getPremiumAlphaKeyboard, getAlphaWaitlistKeyboard } from "./keyboards/preset.keyboards";


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

// ============================================
// AUTOTRADING CALLBACKS
// ============================================
bot.callbackQuery(CALLBACKS.START_AUTOTRADING, handleAutotrading);
bot.callbackQuery(CALLBACKS.PAUSE_AUTOTRADING, handleAutotrading);

// ============================================
// SOURCE MANAGEMENT CALLBACKS
// ============================================
bot.callbackQuery(CALLBACKS.ADD_SOURCES, handleSources);
bot.callbackQuery(CALLBACKS.SELECT_AUTOTRADE, handleSources);
bot.callbackQuery(CALLBACKS.SELECT_PRIVATE, handleSources);
bot.callbackQuery(CALLBACKS.ADD_YOUR_OWN, handleSources);
bot.callbackQuery(CALLBACKS.MORE_SOURCES, handleSources);        // Pagination
bot.callbackQuery(CALLBACKS.PREV_SOURCES, handleSources);        // Go back
bot.callbackQuery(CALLBACKS.ADD_MORE_SOURCES, handleSources);    // Add sources menu
bot.callbackQuery(CALLBACKS.SUPER_ALPHA, handleSources);
bot.callbackQuery(CALLBACKS.ANY_THREE, handleSources);
bot.callbackQuery(CALLBACKS.RECOVERY_RADAR, handleSources);
bot.callbackQuery(CALLBACKS.BSC_PLAYS, handleSources);
bot.callbackQuery(CALLBACKS.DOUBLE_TAP, handleSources);
bot.callbackQuery(CALLBACKS.FIRST_TWO, handleSources);
bot.callbackQuery(CALLBACKS.MOONX, handleSources);

// ============================================
// MAIN MENU CALLBACK
// ============================================

// ============================================
// HOW TO USE / HELP CALLBACKS
// ============================================
bot.callbackQuery(CALLBACKS.HOW_TO_USE, handleHelp);
bot.callbackQuery(CALLBACKS.GITBOOK, handleHelp);
bot.callbackQuery(CALLBACKS.YOUTUBE, handleHelp);
bot.callbackQuery(CALLBACKS.WHY_ACCESS, handleHelp);
bot.callbackQuery(CALLBACKS.AUTHORIZE_ACCESS, handleHelp);
bot.callbackQuery(CALLBACKS.USE_PRESET_GROUPS, handleHelp);

// ============================================
// PRESET GROUPS CALLBACKS
// ============================================
bot.callbackQuery(CALLBACKS.START_AGENT_MONITORING, handlePreset);
bot.callbackQuery(CALLBACKS.PAUSE_AGENT_MONITORING, handlePreset);
bot.callbackQuery(CALLBACKS.FREE_ALPHA, handlePreset);
bot.callbackQuery(CALLBACKS.PREMIUM_ALPHA, handlePreset);
bot.callbackQuery(CALLBACKS.ALPHA_WAITLIST, handlePreset);
bot.callbackQuery(CALLBACKS.OPEN_SOLSCAN, handlePreset);
bot.callbackQuery(CALLBACKS.CANCEL, handlePreset);

// Free groups
bot.callbackQuery(CALLBACKS.VOLUME_GEMS, handlePreset);
bot.callbackQuery(CALLBACKS.ADS_PAID, handlePreset);
bot.callbackQuery(CALLBACKS.DEX_PAID, handlePreset);
bot.callbackQuery(CALLBACKS.TG_60_WINRATE, handlePreset);
bot.callbackQuery(CALLBACKS.JEFFREYS_PLAYS, handlePreset);
bot.callbackQuery(CALLBACKS.ALPHA_TESTS, handlePreset);
bot.callbackQuery(CALLBACKS.JITO_TESTS, handlePreset);
bot.callbackQuery(CALLBACKS.REFACTOR_TEST, handlePreset);
bot.callbackQuery(CALLBACKS.TEST_GROUP_33, handlePreset);
bot.callbackQuery(CALLBACKS.DEV_ENVIRONMENT, handlePreset);
bot.callbackQuery(CALLBACKS.WEBAPP_TESTS, handlePreset);

// Premium groups
bot.callbackQuery(CALLBACKS.SPYFLY_PRIME, handlePreset);
bot.callbackQuery(CALLBACKS.SUPER_ALPHA_PREMIUM, handlePreset);
bot.callbackQuery(CALLBACKS.RECOVERY_RADAR_PREMIUM, handlePreset);

// ============================================
// TEXT MESSAGE HANDLER (for phone input)
// ============================================
bot.on("message:text", handlePhoneInput);
bot.callbackQuery(CALLBACKS.MAIN_MENU, async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  await ctx.answerCallbackQuery();

  const state = getUserState(userId);
  
  // Reset to main menu
  updateUserState(userId, {
    currentMenu: "main",
    previousMenu: [],
  });

  // Show main menu with dynamic autotrading button
  await editMenu(
    ctx,
    MESSAGES.RETURNING_WELCOME,
    getReturningUserKeyboard(state.isAutotrading)
  );

});


// Skip tutorial - EDIT the message instead of sending new one
bot.callbackQuery(CALLBACKS.SKIP_TUTORIAL, async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  await ctx.answerCallbackQuery();
  
  const state = getUserState(userId);
  updateUserState(userId, { isReturningUser: true });
  
  // LOGIC: Edit photo caption (must be short - under 1024 chars)
  await ctx.editMessageCaption({
    caption: `Tutorial skipped! ✓

Welcome to SpyFly Stealth Bot 🚀

Use the buttons below to get started.`,
    reply_markup: getReturningUserKeyboard(state.isAutotrading),  // ← Dynamic button
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

    add_sources: {
      text: MESSAGES.ADD_SOURCES_MENU,
      keyboard: getAddSourcesKeyboard(),
    },
    select_autotrade: {
      text: MESSAGES.SELECT_SOURCES_AUTOTRADE,
      keyboard: getAutotradingSourcesKeyboard(state.selectedAutotradeSources, false),
    },
    select_private: {
      text: MESSAGES.SELECT_SOURCES_PRIVATE,
      keyboard: getPrivateSourcesKeyboard(state.selectedPrivateSources, false),
    },
    select_autotrade_more: {
      text: MESSAGES.SELECT_SOURCES_AUTOTRADE,
      keyboard: getAutotradingSourcesKeyboard(state.selectedAutotradeSources, true),
    },
    select_private_more: {
      text: MESSAGES.SELECT_SOURCES_PRIVATE,
      keyboard: getPrivateSourcesKeyboard(state.selectedPrivateSources, true),
    },
      // NEW MENUS
      how_to_use: {
        text: MESSAGES.HOW_TO_USE_MENU,
        keyboard: getHowToUseKeyboard(),
      },
      why_access: {
        text: MESSAGES.WHY_SPYFLY_ACCESS,
        keyboard: getWhyAccessKeyboard(),
      },
      preset_groups: {
        text: MESSAGES.PRESET_GROUPS_MENU,
        keyboard: getPresetGroupsKeyboard(state.isAgentMonitoring),
      },
      free_alpha: {
        text: MESSAGES.SELECT_FREE_ALPHA,
        keyboard: getFreeAlphaKeyboard(),
      },
      premium_alpha: {
        text: MESSAGES.SELECT_PREMIUM_ALPHA,
        keyboard: getPremiumAlphaKeyboard(),
      },
      alpha_waitlist: {
        text: MESSAGES.ALPHA_WAITLIST,
        keyboard: getAlphaWaitlistKeyboard(),
      },
  };

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