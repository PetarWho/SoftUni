from project.player import Player


class Team:
    def __init__(self, name: str, rating: int):
        self.__name = name
        self.__rating = rating
        self.__players = []

    def add_player(self, player: Player) -> str:
        if player in self.__players:
            return f"Player {player.name} has already joined"
        self.__players.append(player)
        return f"Player {player.name} joined team {self.__name}"

    def remove_player(self, player__name: str) -> str:
        for player in self.__players:
            if player.name == player__name:
                self.__players.remove(player)
                return player
        return f"Player {player__name} not found"

    def __str__(self) -> str:
        result = f"Team {self.__name}:\n"
        for player in self.__players:
            result += str(player) + "\n"
        return result
