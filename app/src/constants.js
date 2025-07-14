export const screens = {
    start: "start",
    game: "game",
    finish: "finish",
    settings: "settings",
    loading: "loading",
    stats: "stats",
};

export const BUZZ_SECONDS = 15;
export const GAME_SECONDS = 70;

export const GREEN_CHECK_EMOJI_HTML = <span>&#9989;</span>;
export const NEXT_TRACK_EMOJI_HTML = <span>&#9197;&#65039;</span>;
export const RED_X_EMOJI_HTML = <span>&#10060;</span>;
export const CLOCK_EMOJI_HTML = <span>&#128337;</span>;

export const CATEGORIES_DICT = {
    "Current Events": {"emoji": "🗞️", "color": "#9D5603"},
    "US History": {"emoji": "🇺🇸", "color": "#FF3131"},
    "Sports": {"emoji": "🏆", "color": "#FF914D"},
    "World History": {"emoji": "🏺", "color": "#FFCC00"},
    "Science": {"emoji": "🔬", "color": "#00BF63"},
    "Geography": {"emoji": "🌏", "color": "#5271FF"},
    "Arts & Literature": {"emoji": "🎭", "color": "#9D5603"},
    "Entertainment": {"emoji": "🎬", "color": "#FF66C4"},
    "Tennis": {"emoji": "🎾", "color": "#FF914D"},
    "Golf": {"emoji": "⛳️", "color": "#FF914D"},
}

export const CATEGORIES_NAME_LIST = Object.keys(CATEGORIES_DICT);

export const CATEGORY_EMOJI_MAP = Object.fromEntries(
  Object.entries(CATEGORIES_DICT).map(([key, value]) => [key, value.emoji])
);

export const CATEGORY_COLOR_MAP = Object.fromEntries(
  Object.entries(CATEGORIES_DICT).map(([key, value]) => [key, value.color])
);

export const CATEGORIES_NAME_AND_EMOJIS_LIST = Object.entries(CATEGORIES_DICT).map(
  ([key, value]) => `${key} ${value.emoji}`
);

export const CATEGORIES_SET = new Set(CATEGORIES_NAME_LIST);

export const GAME_MODE_STORAGE_KEY = "game_mode";

export const SEEN_ANNOUNCEMENT_STORAGE_KEY = "seen_announcement";
export const SEEN_ANNOUNCEMENT_2_STORAGE_KEY = "seen_announcement_2";

export const GameModes = {
    FREE_RESPONSE: "free_response"//,
    // MULTIPLE_CHOICE: "multiple_choice",
};

export const FIRST_GAME_DATE = new Date(2025, 6, 14);
export const LAST_GAME_DATE = new Date(2025, 6, 15);
//export const LAST_QUESTIONS_INDEX = 0;

export default screens;
