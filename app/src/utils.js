import { CATEGORY_EMOJI_MAP } from "./constants";

export const convertNumberToEmoji = (number) => {
    // Map digits to corresponding emoji using a lookup object
    const emojiMap = {
        0: "0️⃣",
        1: "1️⃣",
        2: "2️⃣",
        3: "3️⃣",
        4: "4️⃣",
        5: "5️⃣",
        6: "6️⃣",
        7: "7️⃣",
        8: "8️⃣",
        9: "9️⃣",
        10: "🔟",
    };

    if (number in emojiMap) {
        return emojiMap[number];
    } else {
        return number;
    }
};

export const getEmojiForCategory = (category) => {
    // Map digits to corresponding emoji using a lookup object
    if (category in CATEGORY_EMOJI_MAP) {
        return CATEGORY_EMOJI_MAP[category];
    } else {
        return "";
    }
};
