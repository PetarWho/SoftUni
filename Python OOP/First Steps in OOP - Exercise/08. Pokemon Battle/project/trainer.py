from project.pokemon import Pokemon


class Trainer:
    def __init__(self, name: str):
        self.name = name
        self.pokemons = []

    def add_pokemon(self, pokemon: Pokemon):
        if self.pokemons.__contains__(pokemon):
            return "This pokemon is already caught"

        self.pokemons.append(pokemon)
        return f"Caught {pokemon.pokemon_details()}"

    def release_pokemon(self, pokemon_name: str):
        if any(x.name == pokemon_name for x in self.pokemons):
            self.pokemons = [x for x in self.pokemons if x.name != pokemon_name]
            return f"You have released {pokemon_name}"
        return "Pokemon is not caught"

    def trainer_data(self):
        pokemons_str = ''
        for x in self.pokemons:
            pokemons_str += '\n- ' + x.pokemon_details()
        return f"Pokemon Trainer {self.name}\nPokemon count {len(self.pokemons)}{pokemons_str}"

