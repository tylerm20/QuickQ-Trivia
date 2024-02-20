import json
import random

def split_json_array_randomly(file_path, chunk_size):
    """Splits a JSON array from a file into random-sized chunks.

    Args:
        file_path (str): The path to the JSON file.
        chunk_size (int): The maximum desired size of each chunk.

    Returns:
        dict: A dictionary containing the original outer array key with
              a list of the randomly created chunks.
    """

    with open(file_path, 'r') as f:
        data = json.load(f)

    outer_array = data  # Assuming top-level array (adjust if necessary)
    random.shuffle(outer_array)

    chunks = []
    current_chunk = []
    for item in outer_array:
        current_chunk.append(item)
        if len(current_chunk) >= chunk_size:
            chunks.append(current_chunk)
            current_chunk = []

    if current_chunk:
        chunks.append(current_chunk)

    return chunks

# Example Usage
if __name__ == '__main__':
    file_path = '/Users/mheavey/personal/minquiz/ms_questions.json'  # Replace with your JSON file's name
    max_chunk_size = 10
    result = split_json_array_randomly(file_path, max_chunk_size)
    
    with open('chunked_questions.json', 'w') as f:
        json.dump(result, f, indent=4)  # Write the result to the file