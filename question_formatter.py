import json
import re

def convert_to_json(input_filename, output_filename):
    with open(input_filename, 'r') as input_file:
        data_lines = input_file.readlines()

    json_data = []
    for line in data_lines:
        line = line.strip()
        if line and line[0] == "{" and line[-1] == "}":
            try:
                json_dict = json.loads(line)
                json_data.append(json_dict)
            except json.JSONDecodeError:
                print(f"Error parsing line: {line}")

    with open(output_filename, 'w') as output_file:
        json.dump(json_data, output_file, indent=4)

def convert_to_json_only_ms_questions(input_filename, output_filename):
    with open(input_filename, 'r') as input_file:
        data_lines = json.load(input_file)

    ms_questions = []
    for line in data_lines:
        if line["difficulty"] == "MS":
            ms_questions.append(line)
          
    with open(output_filename, 'w') as output_file:
        json.dump(ms_questions, output_file, indent=4)

def update_answers(input_filename, output_filename):
    with open(input_filename, 'r') as input_file:
        data_lines = json.load(input_file)
    
    for line in data_lines:
        current_answer_string = line["answer"]
         # Regular expression to find substrings within curly braces
        curly_braces_pattern = r"\{(.*?)\}"

        # Extract substrings within curly braces
        matches = re.findall(curly_braces_pattern, current_answer_string)

        # Remove curly braces, keeping the content
        cleaned_text = re.sub(curly_braces_pattern, r'\1', current_answer_string)  

        del line["answer"]
        line["asnwers"] = matches + [cleaned_text]

        current_question_string = line["question"]
        # Remove bracketed sections with specific criteria
        pronunciation_pattern = r"\(.*?\-.*?\)"

        cleaned_text = re.sub(pronunciation_pattern, "", current_question_string)
        # Replace curly quotes with straight quotes
        new_question_string = cleaned_text.replace("\u201c", "\"").replace("\u201d", "\"").replace("(*) ", "").replace(", for 10 points,", "").replace("  ", " ").replace(" .", ".").replace("For 10 points,", "For your answer")


        line["question"] = new_question_string

    with open(output_filename, 'w') as output_file:
        json.dump(data_lines, output_file, indent=4)
    return

# Example usage
input_filename = "/Users/mheavey/personal/minquiz/unformatted_questions_unused.json"
output_filename = "formatted_qs_p1.json"
update_answers(input_filename, output_filename)

