function monkeyPatcher(action) {
    switch(action) {
        case 'upvote':
            upvote.call(this);
            break;
        case 'downvote':
            downvote.call(this);
            break;
        case 'score':
            const report = score.call(this);
            return report;
    }

    function upvote() {
        this.upvotes++;
    }

    function downvote() {
        this.downvotes++;
    }

    function score() {
        const totalVotes = this.upvotes + this.downvotes;
        const tallyScoreVotes = this.upvotes - this.downvotes;
        const obfuscation = Math.ceil(Math.max(this.upvotes, this.downvotes) * 0.25);
        const upvotesObfuscated = totalVotes > 50 ? this.upvotes + obfuscation : this.upvotes;
        const downvotesObfuscated = totalVotes > 50 ? this.downvotes + obfuscation : this.downvotes;
        const report = [upvotesObfuscated, downvotesObfuscated, tallyScoreVotes , rating.call(this)]

        function rating() {
            let rating = 'new';
            if (totalVotes < 10) {
                rating = 'new';
            } else if (this.upvotes > totalVotes * 0.66) {
                rating = 'hot';
            } else if (tallyScoreVotes >= 0 && (this.upvotes > 100 || this.downvotes > 100)) {
                rating = 'controversial';
            } else if (tallyScoreVotes < 0) {
                rating = 'unpopular';
            }
            return rating;
        };
        return report;
    }
}