import json
from datetime import date

def extract_first_answers(data):
    for question_set in data:
        for question in question_set:
            first_answer = question["answers"][0]  # Get the first answer from the list
            print(first_answer)

# Load the JSON file (replace with your actual file path)
today_str = date.today().strftime("%m_%d_%Y")
json_filepath = '/questions/categories/output/qq_qs_{}.json'.format(today_str)
with open(json_filepath, 'r') as f:
    data = json.load(f)

# Extract and print the first answers
extract_first_answers(data)
