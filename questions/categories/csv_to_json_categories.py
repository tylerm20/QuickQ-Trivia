import csv
import json
import random

def csv_to_json(json_filepath, array_column):
    """
    Converts a CSV file to a JSON file, with a specified column
    output as an array of strings.

    Args:
        csv_filepath (str): The path to the CSV file.
        json_filepath (str): The path to the output JSON file.
        array_column (str): The name of the column to be output as an array.
    """
    csv_filepaths = [
        '/Users/mheavey/personal/minquiz/questions/categories/arts_and_literature.csv',
        '/Users/mheavey/personal/minquiz/questions/categories/current_events.csv',
        '/Users/mheavey/personal/minquiz/questions/categories/entertainment.csv',
        '/Users/mheavey/personal/minquiz/questions/categories/geography.csv',
        '/Users/mheavey/personal/minquiz/questions/categories/science.csv',
        '/Users/mheavey/personal/minquiz/questions/categories/sports.csv',
        '/Users/mheavey/personal/minquiz/questions/categories/us_history.csv',
        '/Users/mheavey/personal/minquiz/questions/categories/world_history.csv',
    ]
    category_to_questions = {}

    for csv_filepath in csv_filepaths:
        category_to_questions[csv_filepath] = []
        with open(csv_filepath, encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            for row in csv_reader:
                if row["used"] == "FALSE" and row["question"]:
                    if "answers" in row:
                        row["answers"] = row["answers"].split(',')  # Modify this if your delimiter is different
                
                    category_to_questions[csv_filepath].append(row)
                random.shuffle(category_to_questions[csv_filepath])

    multiple_days_qs = []
    for i in range(5):
        daily_qs = []
        for category, questions in category_to_questions.items():
            daily_qs.append(questions[i])
        random.shuffle(daily_qs)
        multiple_days_qs.append(daily_qs)
    

    with open(json_filepath, 'w', encoding='utf-8') as json_file:
        json.dump(multiple_days_qs, json_file, indent=4)

# Example usage
json_filepath = '/Users/mheavey/personal/minquiz/questions/categories/ordered_qs/qq_qs_4_14_24.json'
csv_to_json(json_filepath, "answers")
