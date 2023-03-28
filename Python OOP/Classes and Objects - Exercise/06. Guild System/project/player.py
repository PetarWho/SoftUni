class Player:
    def __init__(self, name:str, hp:int, mp:int):
        self.name = name
        self.hp = hp
        self.mp = mp
        self.skills = dict()
        self.guild = "Unaffiliated"

    def add_skill(self, skill_name, mana_cost):
        if skill_name in self.skills.keys():
            return "Skill already added"
        self.skills[skill_name] = mana_cost
        return f"Skill {skill_name} added to the collection of the player {self.name}"

    def player_info(self):
        skill_prefix = "==="
        skills_str = "\n".join([skill_prefix + sname + " - " + str(smana) for sname, smana in self.skills.items()])
        return f"Name: {self.name}\nGuild: {self.guild}\nHP: {self.hp}\nMP: {self.mp}\n{skills_str}\n"
