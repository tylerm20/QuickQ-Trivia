import React, { useState, useEffect } from "react";
import "./style.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
    CATEGORY_EMOJI_MAP,
    CATEGORY_COLOR_MAP,
    CATEGORIES_SET,
} from "../../constants";

export const CategoriesChart = () => {
    const [categoryScores, setCategoryScores] = useState({});
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

    const calculateCategoryScores = () => {
        Object.keys(CATEGORY_EMOJI_MAP).forEach(
            (category) => (categoryScores[category] = 0)
        );
        Object.keys(localStorage).forEach((key) => {
            const results = localStorage.getItem(key);
            try {
                const jsonResults = JSON.parse(results);
                const questionResults = jsonResults.questionResults;
                questionResults.forEach((questionResult) => {
                    if (
                        CATEGORIES_SET.has(questionResult.category) &&
                        questionResult.isCorrect
                    ) {
                        categoryScores[questionResult.category]++;
                    }
                });
            } catch (e) {
                // continue
            }
        });
        setCategoryScores(categoryScores);
    };

    useEffect(() => calculateCategoryScores(), [calculateCategoryScores]);

    const options = {
        aspectRatio: 0.8,
        responsive: true,
        indexAxis: "y",
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    stepSize: 1,

                    font: {
                        size: 16, // Increase the font size as needed
                    },
                    // Optionally adjust color and other font properties
                    color: "#000", // Example to change the text color
                },
            },
            y: {
                grid: { display: false },
                ticks: {
                    font: {
                        size: 30, // Consistent or different font size for y-axis labels
                    },
                    color: "#000", // Example to change the text color
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    // show the category name as tooltip title
                    title: (context) =>
                        Object.keys(CATEGORY_EMOJI_MAP)[context[0].dataIndex],
                },
            },
            fill: true,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Points by Category",
                font: { size: 16 },
            },
        },
    };

    const data = {
        labels: Object.values(CATEGORY_EMOJI_MAP),
        datasets: [
            {
                data: Object.keys(CATEGORY_EMOJI_MAP).map(
                    (category) => categoryScores[category]
                ),
                backgroundColor: Object.values(CATEGORY_COLOR_MAP),
                borderRadius: 5, // Apply rounded corners
            },
        ],
    };
    return <Bar options={options} data={data} />;
};

export default CategoriesChart;
