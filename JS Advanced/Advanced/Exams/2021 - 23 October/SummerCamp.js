class SummerCamp {
    constructor(organizer, location) {
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = {
            'child': 150,
            'student': 300,
            'collegian': 500,
        }
        this.listOfParticipants = [];
    }

    registerParticipant(name, condition, money) {
        if (!(condition in this.priceForTheCamp)) {
            throw new Error('Unsuccessful registration at the camp.');
        }
        if (this.listOfParticipants.some(x => x.name === name)) {
            return `The ${name} is already registered at the camp.`
        }
        if (Number(money) < this.priceForTheCamp[condition]) {
            return `The money is not enough to pay the stay at the camp.`;
        }
        this.listOfParticipants.push({ name, condition, power: 100, wins: 0 });
        return `The ${name} was successfully registered.`;
    }

    unregisterParticipant(name) {
        if (!(this.listOfParticipants.some(obj => obj.name === name))) {
            throw new Error(`The ${name} is not registered in the camp.`);
        }
        this.listOfParticipants = this.listOfParticipants.filter(participant => participant.name !== name);
        return `The ${name} removed successfully.`;
    }

    timeToPlay(typeOfGame, ...participants) {
        participants.forEach(x => {
            if (!(this.listOfParticipants.some(p => p.name === x))) {
                throw new Error(`Invalid entered name/s.`);
            }
        })

        const participant1 = this.listOfParticipants.find(participant => participant.name === participants[0]);
        const participant2 = this.listOfParticipants.find(participant => participant.name === participants[1]);



        if (typeOfGame === 'WaterBalloonFights') {
            if (participant1.condition !== participant2.condition) {
                throw new Error(`Choose players with equal condition.`);
            }
            if (participant1.power == participant2.power) {
                return `There is no winner.`;
            }

            participant1.power > participant2.power ? participant1.wins++ : participant2.wins++;
            return `The ${participant1.power > participant2.power ? participant1.name : participant2.name} is winner in the game ${typeOfGame}.`;
        }
        else if (typeOfGame === 'Battleship') {
            participant1.power += 20;
            return `The ${participant1.name} successfully completed the game ${typeOfGame}.`;
        }
    }

    toString() {
        this.listOfParticipants.sort((p1, p2) => p2.wins - p1.wins);
        const stringWithoutParticipants = `${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}`;
        const stringWithParticipants = this.listOfParticipants
        .map(participant => `${participant.name} - ${participant.condition} - ${participant.power} - ${participant.wins}`)
        .join('\n');

        return this.listOfParticipants.length > 0 
                ? stringWithoutParticipants + `\n${stringWithParticipants}`
                : stringWithoutParticipants + '\n';
    }
}

