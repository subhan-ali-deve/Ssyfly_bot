/**
 * LOGIC: All text messages and button labels in one place
 * WHY: Easy to update without touching code logic
 */

export const MESSAGES = {
  // Initial /start message for new users
  INITIAL_WELCOME: `We know why you are here

Jeffrey will guide you through all necessary steps to become a spy in the trenches!

SpyFly is a powerful trading bot with Telegram & Discord scrapers and an automation layer to execute your trades and strategy.

@SpyFlyAgents aggregates alerts from multiple paid/private sources into one clean feed, so you can see where attention and volume are moving in real time.

What do you want to do first?`,

  // Returning user /start message
// Shorter version for photo caption (must be under 1024 characters)
RETURNING_WELCOME: `Welcome to SpyFly Stealth Bot 🚀

The official bot from spyflyapp.
The future of alpha trading is here!

What SpyFly Does:
- Monitors Telegram 24/7 for alpha calls
- Auto trades when CA drops
- Smart filters, global SL/TP controls
- Multi-group monitoring

Easy Steps:
1. Authenticate → monitor your groups
2. Wallets → fund with SOL
3. Settings → add groups, set risk
4. Start → let SpyFly execute trades

Referral Program
Earn 15% of friend's fees automatically!

Auto Trading, Made Easy w/ SpyFly`,

  // Channel setup messages
  CHANNEL_SELECT_SOURCES: "Let's select your sources to monitor",
  CHANNEL_SELECT_PROMPT: "Select Sources to Monitor\nChoose source:",
  CHANNEL_ADD_CUSTOM: "Let's add your own alpha sources to monitor",
  
  CHANNEL_AUTH_INFO: `VERY IMPORTANT! READ FIRST!

Why does SpyFly ask for Telegram access?
- SpyFly watches the groups you choose without you adding it as an admin. Access lets SpyFly read-only in your chats you wish to monitor. Without access SpyFly won't be able to monitor your signal groups.
- Read-only: SpyFly scan messages to spot contract addresses (CA).
- When a new CA appears from your trusted sources, SpyFly auto-trades with your rules (size, TP/SL/DL) so you don't miss entries while you're busy or asleep.

Don't want to give access?
- Use Preset Signal Groups (no auth needed).
- You still get auto-trading + TP/SL/DL, but only from our preset sources (not your private groups).

Choose your setup
- [Authorize Telegram Access] – Best results (uses your private groups)
- [Use Preset Signal Groups] – No auth, quick start
- [Disconnect] – Turn off access anytime`,

  CHANNEL_AUTH_PHONE: `Authorize Telegram Access

To monitor your sources, SpyFly needs access to your Telegram account. Please send your phone number with country code

Format: \`+[country code][number]\`
Examples:
- \`+12345678900\` (US)
- \`+442079460958\` (UK)
- \`+525512345678\` (MX)

✓ Must be registered with Telegram
✓ Spaces and dashes are optional
✓ Your credentials are stored securely`,

  // Trading setup messages
  TRADING_INTRO: `Your road to mastery auto-trading starts here

Let's set up your best Trading configuration.
The most important is your Risk Strategy.

Which option do you prefer?`,

  TRADING_JEFFREY_SETUP: `Amazing choice! You're taking the shortcut.

We've set you up with Jeffrey's Strategy:
- TP #1: +100% → Sell 25%
- TP #2: +300% → Sell 33%
- TP #3: +500% → Sell 50%
- TP #4: +1000% → Sell 50%
- TP #5: +5000% → Sell 100%

Deadlock: After any TP is reached and price drops 30%, sell 50%.
SL #1: Buy price -50% → Sell 90%

Continue:`,

  TRADING_ECOSYSTEM: `Great Progress!

Now let's get real.
Which ecosystem do you want SpyFly to auto-trade signals from?`,

  TRADING_SOL_AMOUNT: (current: number) => `Set Buy Amount for SOL

Current buy amount: ${current} SOL
Enter the amount of SOL to use per trade:`,

  TRADING_BNB_AMOUNT: (current: number) => `Set Buy Amount for BNB

Current buy amount: ${current} BNB
Enter the amount of BNB to use per trade:`,

  TRADING_CUSTOM_TP: "How many TP levels do you want?",
};

export const BUTTONS = {
  // Main menu
  CHANNEL_SETUP: "Channel Setup",
  AUTOTRADING_SETUP: "Autotrading Setup",
  SKIP_TUTORIAL: "Skip Tutorial",

  // Channel setup
  SELECT_SOURCE: "Select source to monitor",
  CONTINUE_ONBOARDING: "Continue Onboarding ✓",
  ADD_OWN_SOURCES: "Add your own sources to alpha channel",
  SKIP_SETUP: "Skip this setup",
  MORE: "More",
  PREV: "Prev",
  BACK: "Back",

  // Source names
  SUPER_ALPHA: "SUPER ALPHA (preset ★)",
  ANY_THREE: "Any Three - 3 min (SHOCKED, PASTEL, POTION & others) (preset...)",
  RECOVERY_RADAR: "SpyFly Recovery Radar (preset ★)",
  BSC_PLAYS: "BSC Plays by SpyFly (preset ★)",
  DOUBLE_TAP: "DoubleTap 3 min (SHOCKED, PASTEL, POTION & OTHERS) (pres...)",
  FIRST_TWO: "First Two - 3 min (SHOCKED, PASTEL, POTION & others) (preset...)",
  MOONX: "SpyFly MoonX (preset ★)",

  // Auth
  DO_YOU_WISH_CONTINUE: "Do you wish to continue with auth",

  // Trading setup
  JEFFREY_SETUP: "Jeffrey's Setup",
  CUSTOM_SETUP: "Custom Setup",
  SET_CORE_SETUP: "Set Core Setup",
  
  // Ecosystems
  SOLANA: "Solana",
  BSC: "BSC",
  BOTH: "Both",

  // Returning user menu
  START_AUTOTRADING: "⚡ Start Autotrading",
  ADD_SOURCES: "📡 Add Sources",
  SELECT_SOURCES_AUTOTRADE: "Select Sources to autotrade",
  SELECT_SOURCES_PRIVATE: "Select Sources for private signal feed",
  CREATE_SIGNAL_FEED: "🔥 Create my signal feed / View my signal feed",
  HOW_TO_USE: "How to use SpyFly bot?",
  JOIN_ALPHA_WAITLIST: "Join Alpha+ Waitlist",
  ACCOUNT_WALLETS: "Account Management & Wallets",
  POSITIONS: "Positions",
  SETTINGS: "⚙️ Settings",
  SUPPORT: "Support",
  BECOME_SPY: "🕵️ Become a Spy!",
  REFER_FRIEND: "Refer a friend!",
  JOIN_ALPHA_CHANNEL: "Join Official Alpha Channel",
};

// Callback data identifiers for button clicks
export const CALLBACKS = {
  // Main menu
  CHANNEL_SETUP: "channel_setup",
  AUTOTRADING_SETUP: "autotrading_setup",
  SKIP_TUTORIAL: "skip_tutorial",

  // Channel flow
  SELECT_SOURCE: "select_source",
  CONTINUE_ONBOARDING: "continue_onboarding",
  ADD_OWN_SOURCES: "add_own_sources",
  SKIP_CHANNEL_SETUP: "skip_channel_setup",
  MORE_SOURCES: "more_sources",
  PREV_SOURCES: "prev_sources",
  
  // Source selection
  SUPER_ALPHA: "source_super_alpha",
  ANY_THREE: "source_any_three",
  RECOVERY_RADAR: "source_recovery_radar",
  BSC_PLAYS: "source_bsc_plays",
  DOUBLE_TAP: "source_double_tap",
  FIRST_TWO: "source_first_two",
  MOONX: "source_moonx",

  // Auth
  CONTINUE_AUTH: "continue_auth",

  // Trading flow
  JEFFREY_SETUP: "jeffrey_setup",
  CUSTOM_SETUP: "custom_setup",
  SET_CORE_SETUP: "set_core_setup",
  
  // Ecosystems
  ECOSYSTEM_SOLANA: "eco_solana",
  ECOSYSTEM_BSC: "eco_bsc",
  ECOSYSTEM_BOTH: "eco_both",

  // Navigation
  BACK: "back",
};