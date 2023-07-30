import os
import json

def create_directory_tree(root_path):
    tree = {}
    for root, dirs, files in os.walk(root_path):
        current_dir = tree
        for directory in root.split(os.path.sep):
            current_dir = current_dir.setdefault(directory, {})
        for file in files:
            current_dir[file] = None
    return tree

def save_tree_to_json(tree, output_file):
    with open(output_file, 'w') as f:
        json.dump(tree, f, indent=2)

if __name__ == "__main__":
    root_path = '../'
    tree = create_directory_tree(root_path)
    output_file = 'directory_tree.json'
    save_tree_to_json(tree, output_file)

