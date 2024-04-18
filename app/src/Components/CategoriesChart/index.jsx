import React, { useState } from "react";
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
import { CATEGORIES_EMOJIS_LIST } from "../../constants";

export const CategoriesChart = () => {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

    const options = {
        aspectRatio: 0.8,
        responsive: true,
        indexAxis: "y",
        font: { size: 20 },
        scales: {
            x: {
                // Assuming the categories are on the x-axis
                ticks: {
                    font: {
                        size: 16, // Increase the font size as needed
                    },
                    // Optionally adjust color and other font properties
                    color: "#000", // Example to change the text color
                },
            },
            y: {
                // Configuration for the y-axis
                ticks: {
                    font: {
                        size: 30, // Consistent or different font size for y-axis labels
                    },
                    color: "#000", // Example to change the text color
                },
            },
        },
        plugins: {
            fill: true,
            // font: {
            //     size: 16, // Large font size for data labels
            // },
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Qs Correct by Category",
            },
        },
    };

    const data = {
        labels: CATEGORIES_EMOJIS_LIST,
        datasets: [
            {
                data: CATEGORIES_EMOJIS_LIST.map(() => 10),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };
    return <Bar options={options} data={data} />;
};

export default CategoriesChart;
