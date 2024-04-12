import csv
import json
import random

def csv_to_json(csv_filepath, json_filepath, array_column):
    """
    Converts a CSV file to a JSON file, with a specified column
    output as an array of strings.

    Args:
        csv_filepath (str): The path to the CSV file.
        json_filepath (str): The path to the output JSON file.
        array_column (str): The name of the column to be output as an array.
    """

    data = []
    with open(csv_filepath, encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            # Split the specified column into an array 
            if array_column in row:
                row[array_column] = row[array_column].split(',')  # Modify this if your delimiter is different
            data.append(row)

            random.shuffle(data)

    with open(json_filepath, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4)

# Example usage
csv_filepath = '/Users/mheavey/personal/minquiz/questions/qq_qs_3.csv'
json_filepath = '/Users/mheavey/personal/minquiz/questions/qq_qs_3.json'
csv_to_json(csv_filepath, json_filepath, "answers")
