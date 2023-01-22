line = input()
result = {x: line.count(x) for x in sorted(list(line))}

[print(f"{k}: {v} time/s") for k, v in result.items()]
