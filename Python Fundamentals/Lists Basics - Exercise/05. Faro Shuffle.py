deck = input().split(' ')
shuffles = int(input())

for _ in range(0, shuffles):
    half1 = deck[:len(deck) // 2]
    half2 = deck[len(deck) // 2:]
    deck.clear()
    for x in range(0, len(half1)):
        deck.append(half1[x])
        deck.append(half2[x])

print(deck)
