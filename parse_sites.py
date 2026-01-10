
import json
import os

try:
    with open('sites.json', 'r', encoding='utf-16-le') as f:
        data = json.load(f)
except Exception:
    try:
        with open('sites.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        exit(1)

for site in data:
    print(f"ID: {site.get('id')}")
    print(f"Name: {site.get('name')}")
    print(f"URL: {site.get('url')}")
    print("-" * 20)
