import gspread
import json
import random
from datetime import date

def sheet_to_json(json_filepath):
    gc = gspread.service_account()

    sh = gc.open("Quiz Questions")

    categories = [
        "Entertainment",
        "Sports",
        "Current Events",
    ]
    category_to_questions_all = {}
    category_to_questions_unused = {}
    for category in categories:
        category_to_questions_all[category] = sh.worksheet(category)
        category_to_questions_unused[category] = []

    for category, worksheet in category_to_questions_all.items():
        for row in worksheet.get_all_records():
            if row["used"] == "FALSE" and row["question"]:
                if "answers" in row:
                    row["answers"] = row["answers"].split(',')  # Modify this if your delimiter is different
                
                category_to_questions_unused[category].append(row)
        random.shuffle(category_to_questions_unused[category])

        file_name = '/Users/mheavey/personal/minquiz/questions/categories/ordered_qs/{}_formatted.json'.format(category.replace(" ", "_").lower())

        with open(file_name, 'w', encoding='utf-8') as json_file:
            json.dump(category_to_questions_unused[category], json_file, indent=4)

json_filepath = '/Users/mheavey/personal/minquiz/questions/categories/ordered_qs/current_events_formatted.json'
sheet_to_json(json_filepath)
