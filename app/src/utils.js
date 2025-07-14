import { CATEGORY_EMOJI_MAP, CATEGORIES_SET, GameModes } from "./constants";

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


export const calculateCategoryScores = () => {
    const categoryCounters = {};

    // Initialize counters for all categories
    Object.keys(CATEGORY_EMOJI_MAP).forEach((category) => {
        categoryCounters[category] = { correct: 0, total: 0 };
    });

    // Read localStorage without modifying it
    Object.keys(localStorage).forEach((key) => {
        const value = localStorage.getItem(key);
        try {
            const parsed = JSON.parse(value);
            const questionResults = parsed.questionResults;

            questionResults.forEach(({ category, isCorrect }) => {
                if (CATEGORIES_SET.has(category)) {
                    categoryCounters[category].total += 1;
                    if (isCorrect) {
                        categoryCounters[category].correct += 1;
                    }
                }
            });
        } catch (e) {
            // Ignore non-JSON or malformed entries
        }
    });

    // Calculate accuracy as a percentage
    const accuracyByCategory = {};
    Object.entries(categoryCounters).forEach(([category, { correct, total }]) => {
        accuracyByCategory[category] = total === 0 ? 0 : Math.round((correct / total) * 100);
    });

    return accuracyByCategory;
};

export const shuffleArray = (array) => {
    array.sort(() => Math.random() - 0.5);
    return array;
};

export const isMultipleChoiceMode = (gameMode) => {
    return gameMode === GameModes.MULTIPLE_CHOICE;
};
