import { Context, InputFile } from "grammy";
import fs from "fs";

/**
 * LOGIC: Manages user state and navigation history
 * WHY: Need to track where user is and where they came from for "Back" button
 */

export interface UserState {
  currentMenu: string;
  previousMenu: string[];
  selectedSources: string[];
  isReturningUser: boolean;
  tradingSetup?: {
    setupType?: "jeffrey" | "custom";
    ecosystem?: "solana" | "bsc" | "both";
    solAmount?: number;
    bnbAmount?: number;
  };
}

// In-memory storage for user states (use database in production)
const userStates = new Map<number, UserState>();

/**
 * LOGIC: Get or create user state
 * WHY: Each user needs their own state to track their journey
 */
export function getUserState(userId: number): UserState {
  if (!userStates.has(userId)) {
    userStates.set(userId, {
      currentMenu: "main",
      previousMenu: [],
      selectedSources: [],
      isReturningUser: false,
      tradingSetup: {
        solAmount: 0.1,
        bnbAmount: 0.02,
      },
    });
  }
  console.log(userStates);

  return userStates.get(userId)!;
}

/**
 * LOGIC: Update user state and save previous menu to history
 * WHY: When user navigates forward, we save where they were for "Back"
 */
export function updateUserState(
  userId: number,
  updates: Partial<UserState>
) {
  const state = getUserState(userId);
  
  // If changing menu, save current menu to history
  if (updates.currentMenu && updates.currentMenu !== state.currentMenu) {
    state.previousMenu.push(state.currentMenu);
  }

  Object.assign(state, updates);
  userStates.set(userId, state);
}

/**
 * LOGIC: Go back to previous menu
 * WHY: When user clicks "Back", pop from history and return that menu
 */
export function goBack(userId: number): string {
  const state = getUserState(userId);
  const previousMenu = state.previousMenu.pop() || "main";
  state.currentMenu = previousMenu;
  userStates.set(userId, state);
  return previousMenu;
}

/**
 * LOGIC: Toggle source selection (add if not selected, remove if selected)
 * WHY: User can select/deselect multiple sources
 */
export function toggleSource(userId: number, sourceId: string) {
  const state = getUserState(userId);
  const index = state.selectedSources.indexOf(sourceId);
  
  if (index > -1) {
    // Already selected, remove it
    state.selectedSources.splice(index, 1);
  } else {
    // Not selected, add it
    state.selectedSources.push(sourceId);
  }
  
  userStates.set(userId, state);
  return state.selectedSources;
}

// * 🔑 KEY FUNCTION - THIS MAKES MENUS UPDATE INSTEAD OF SENDING NEW MESSAGES
// * LOGIC: Edit existing message with new text and buttons
// * WHY: This is what makes the menu "consistent" - same message updates
// *
export async function editMenu(
 ctx: Context,
 text: string,
 keyboard: any,
 parseMode: "Markdown" | "HTML" = "Markdown"
) {
 try {
   // Try to edit as text message first
   await ctx.editMessageText(text, {
     reply_markup: keyboard,
     parse_mode: parseMode,
   });
 } catch (error: any) {
   // If error says "no text in the message", it's a photo message
   if (error?.description?.includes("no text in the message")) {
     try {
       // Edit as photo caption instead
       await ctx.editMessageCaption({
         caption: text,
         reply_markup: keyboard,
         parse_mode: parseMode,
       });
     } catch (captionError) {
       console.error("Error editing caption:", captionError);
     }
   } else {
     console.error("Error editing message:", error);
   }
 }
}

/**
 * LOGIC: Send message with photo (only for initial /start)
 * WHY: First message needs to show image, after that we only edit
 */
export async function sendPhotoMenu(
  ctx: Context,
  photoPath: string,
  caption: string,
  keyboard: any
) {
  try {
    // Telegram expects either:
    // - an `http(s)://` URL string, OR
    // - an uploaded file via multipart/form-data (grammy `InputFile` / ReadStream).
    // A Windows filesystem path string like `C:\...` must be wrapped in `InputFile`.
    const isUrl =
      photoPath.startsWith("http://") || photoPath.startsWith("https://");

    if (isUrl) {
      await ctx.replyWithPhoto(photoPath, {
        caption,
        reply_markup: keyboard,
      });
      return;
    }

    if (!fs.existsSync(photoPath)) {
      throw new Error(`Photo file not found: ${photoPath}`);
    }

    await ctx.replyWithPhoto(new InputFile(photoPath), {
      caption: caption,
      reply_markup: keyboard,
    });
  } catch (error) {
    console.error("Error sending photo:", error);
    // Let callers decide whether to fall back to text messages.
    throw error;
  }
}

/**
 * LOGIC: Get human-readable source name from ID
 * WHY: For showing "SUPER ALPHA updated!" confirmation messages
 */
export function getSourceName(sourceId: string): string {
  const sourceNames: Record<string, string> = {
    super_alpha: "SUPER ALPHA",
    any_three: "Any Three - 3 min (SHOCKED, PASTEL, POTION & others)",
    recovery_radar: "SpyFly Recovery Radar",
    bsc_plays: "BSC Plays by SpyFly",
    double_tap: "DoubleTap 3 min (SHOCKED, PASTEL, POTION & OTHERS)",
    first_two: "First Two - 3 min (SHOCKED, PASTEL, POTION & others)",
    moonx: "SpyFly MoonX",
  };
  return sourceNames[sourceId] || sourceId;
}