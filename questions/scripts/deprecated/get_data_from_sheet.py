import gspread
import json
import random
from datetime import date

def get_data_from_sheet(json_filepath):
    gc = gspread.service_account()

    sh = gc.open("Quiz Questions")

    categories = [
        "US History",
        "World History",
        "Science",
        "Geography",
        "Arts & Literature",
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

    # print(category_to_questions_unused)

    multiple_days_qs = []
    fewest_unused_questions = min(len(values) for values in category_to_questions_unused.values())
    print(fewest_unused_questions)
    for i in range(fewest_unused_questions):
        daily_qs = []
        for category, questions in category_to_questions_unused.items():
            daily_qs.append(questions[i])
        random.shuffle(daily_qs)
        multiple_days_qs.append(daily_qs)
    
    with open(json_filepath, 'w', encoding='utf-8') as json_file:
        json.dump(multiple_days_qs, json_file, indent=4)

today_str = date.today().strftime("%m_%d_%Y")
json_filepath = '/questions/categories/ordered_qs/qq_qs_{}.json'.format(today_str)
get_data_from_sheet(json_filepath)
