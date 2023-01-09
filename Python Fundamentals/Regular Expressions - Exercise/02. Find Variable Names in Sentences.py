import re

line = input()
matches = re.findall(r"\b_[a-zA-Z\d]+\b", line)
print(','.join([re.sub('_', '', var) for var in matches]))
