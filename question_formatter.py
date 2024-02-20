import json

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

# Example usage
input_filename = "/Users/mheavey/personal/minquiz/app/public/2015-05-19-QUIZBOWL.json"
output_filename = "ms_questions.json"
convert_to_json_only_ms_questions(input_filename, output_filename)

