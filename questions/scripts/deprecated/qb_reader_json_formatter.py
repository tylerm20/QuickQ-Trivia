import json
import random

def transform_json(input_json):
    output_data = []

    for question_data in input_json["tossups"]:
        transformed_question = {
            "category": "Arts & Literature",
            "source": question_data["set"]["name"],
            "question": question_data["question_sanitized"],
            "answers": [question_data["answer_sanitized"]],  # Assuming a single answer
            "used": "FALSE"
        }
        output_data.append(transformed_question)

        random.shuffle(output_data)
    return output_data

# Load the input JSON (replace with your actual file reading)
with open("~/Documents/quizbowl packets/qb_reader_arts_and_literature.json", "r") as f:
    input_data = json.load(f)

# Transform the data
output_data = transform_json(input_data)

# Write the output JSON (replace with your actual file writing)
with open("/questions/categories/ordered_qs/arts_and_literature_formatted.json", "w") as f:
    json.dump(output_data, f, indent=4)
