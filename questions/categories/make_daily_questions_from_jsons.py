import json
import random
from datetime import date

# Load category-specific JSON files (assuming they are lists of questions)
category_questions = {}
for category_name in ["arts_and_literature", "current_events", "entertainment", "geography", "science", "sports", "us_history", "world_history"]:
    with open(f"/Users/mheavey/personal/minquiz/questions/categories/ordered_qs/{category_name}_formatted.json", "r") as f:
        category_questions[category_name] = json.load(f)

daily_sets = []
# replace range with how many daily sets you want
for _ in range(1):
    daily_set = []
    for category_name, questions in category_questions.items():
        # Select a question (replace with your desired selection logic)
        question = questions.pop(0)  # Simple sequential selection, removes the question from the list
        daily_set.append(question)
    random.shuffle(daily_set)  # Shuffle the order of questions
    daily_sets.append(daily_set)

today_str = date.today().strftime("%m_%d_%Y")
json_filepath = '/Users/mheavey/personal/minquiz/questions/categories/ordered_qs/qq_qs_{}.json'.format(today_str)
with open(json_filepath, "w") as f:
    json.dump(daily_sets, f, indent=4)  # indent for better readability
