import json
import random

def shuffle_json(json_filepath, output_filepath, chunk_size):
    """
    Reads a JSON file, shuffles elements and subarrays, and writes the result to a new file.

    Args:
        json_filepath (str): Path to the input JSON file.
        output_filepath (str): Path to the output JSON file.
    """
    with open(json_filepath, 'r') as file:
        questions = []
        data = json.load(file)

    for group in data:
        for question in group:
            questions.append(question)
    random.shuffle(questions)

    chunks = []
    current_chunk = []
    for item in questions:
        current_chunk.append(item)
        if len(current_chunk) >= chunk_size:
            chunks.append(current_chunk)
            current_chunk = []

    if current_chunk:
        chunks.append(current_chunk)

    # Write shuffled JSON to a new file
    with open(output_filepath, 'w') as file:
        json.dump(chunks, file, indent=4)

# Example usage
json_filepath = '/app/public/written_chunked_questions.json'
output_filepath = '/shuffled_questions.json'
shuffle_json(json_filepath, output_filepath, 8)
