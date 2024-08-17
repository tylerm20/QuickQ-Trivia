import json
import random
from datetime import date

def compile_daily_questions():
    # Load category-specific JSON files
    category_questions = {}
    for category_name in ["arts_and_literature", "current_events", "entertainment", "geography", "science", "sports", "us_history", "world_history"]:
        with open(f"/Users/mheavey/personal/minquiz/questions/categories/{category_name}_formatted.json", "r") as f:
            category_questions[category_name] = json.load(f)

    # Determine the minimum number of unused questions across categories
    min_unused_questions = min(
        sum(1 for q in questions if q["used"] == "FALSE")
        for questions in category_questions.values()
    )

    daily_sets = []
    for _ in range(min_unused_questions): 
        daily_set = []
        for category_name, questions in category_questions.items():
            # Find the first unused question
            for i, question in enumerate(questions):
                if question["used"] == "FALSE":
                    daily_set.append(question)
                    questions[i]["used"] = "TRUE" 
                    break 
            else:
                raise Exception(f"No unused questions found in {category_name}")

        random.shuffle(daily_set)
        daily_sets.append(daily_set)

    # Write the daily questions JSON
    today_str = date.today().strftime("%m_%d_%Y")
    json_filepath = '/Users/mheavey/personal/minquiz/questions/categories/output/qq_qs_{}.json'.format(today_str)
    with open(json_filepath, "w") as f:
        json.dump(daily_sets, f, indent=4)

    # Update the category JSON files
    for category_name, questions in category_questions.items():
        with open(f"/Users/mheavey/personal/minquiz/questions/categories/{category_name}_formatted.json", "w") as f:
            json.dump(questions, f, indent=4)

# Call the function to compile and update questions
compile_daily_questions()
