export const screens = {
    start: "start",
    game: "game",
    finish: "finish",
    settings: "settings",
    loading: "loading",
    stats: "stats",
};

export const BUZZ_SECONDS = 15;
export const GAME_SECONDS = 90;

export const GREEN_CHECK_EMOJI_HTML = <span>&#9989;</span>;
export const NEXT_TRACK_EMOJI_HTML = <span>&#9197;&#65039;</span>;
export const RED_X_EMOJI_HTML = <span>&#10060;</span>;
export const CLOCK_EMOJI_HTML = <span>&#128337;</span>;

export const CATEGORIES_NAME_LIST = [
    "Current Events",
    "US History",
    "Sports",
    "World History",
    "Science",
    "Geography",
    "Arts & Literature",
    "Entertainment",
];

export const CATEGORIES_SET = new Set(CATEGORIES_NAME_LIST);

export const CATEGORIES_NAME_AND_EMOJIS_LIST = [
    "Current Events 🗞️",
    "World History 🏺",
    "Sports 🏆",
    "US History 🇺🇸",
    "Entertainment 🎬",
    "Geography 🌏",
    "Science 🔬",
    "Arts & Literature 🎭",
    "Tennis 🎾"
];

export const CATEGORY_EMOJI_MAP = {
    "Current Events": "🗞️",
    "US History": "🇺🇸",
    "Sports": "🏆",
    "World History": "🏺",
    "Science": "🔬",
    "Geography": "🌏",
    "Arts & Literature": "🎭",
    "Entertainment": "🎬",
    "Tennis": "🎾"
};

export const CATEGORY_COLOR_MAP = {
    "Current Events": "#9D5603", // brown
    "US History": "#FF3131", // red
    "Sports": "#FF914D", // orange
    "World History": "#FFCC00", // yellow
    "Science": "#00BF63", // green
    "Geography": "#5271FF", // blue
    "Arts & Literature": "#8C52FF", // purple
    "Entertainment": "#FF66C4", // pink
    "Tennis": "#00BF63", // green
};

export const GAME_MODE_STORAGE_KEY = "game_mode";

export const SEEN_ANNOUNCEMENT_STORAGE_KEY = "seen_announcement";
export const SEEN_ANNOUNCEMENT_2_STORAGE_KEY = "seen_announcement_2";

export const GameModes = {
    FREE_RESPONSE: "free_response"//,
    // MULTIPLE_CHOICE: "multiple_choice",
};


export const FIRST_GAME_DATE = new Date(2025, 3, 14); // April 14, 2024
export const LAST_GAME_DATE = new Date(2026, 3, 15); // April 12, 2025
//export const LAST_QUESTIONS_INDEX = 364;

export default screens;
