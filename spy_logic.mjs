import { places } from "./wordsData";

export class SpyGame {
    constructor(numberOfPlayers, numberOfSpies, timerDuration) {
        if (numberOfSpies >= numberOfPlayers) {
            throw new Error("Number of spies should be less than the number of players.");
        }
        this.numberOfPlayers = numberOfPlayers;
        this.numberOfSpies = numberOfSpies;
        this.playersStatus = {};
        this.selectedWord = this.selectRandomWord();
        this.timerDuration = timerDuration;
        this.timer = null;
        this.assignRoles();
    }

    selectRandomWord() {
        let arrayLength = places.length;
        return places[Math.floor(Math.random() * arrayLength)];
    }

    assignRoles() {
        // Initialize all players as non-spies with the selected word
        for (let i = 1; i <= this.numberOfPlayers; i++) {
            this.playersStatus[i] = this.selectedWord;
        }
        // Randomly select players to be spies
        let spyIndices = new Set();
        while (spyIndices.size < this.numberOfSpies) {
            let spyIndex = Math.floor(Math.random() * this.numberOfPlayers) + 1;
            spyIndices.add(spyIndex);
        }
        // Assign spies
        spyIndices.forEach(index => {
            this.playersStatus[index] = 'spy';
        });
    }

    getPlayersStatus() {
        return this.playersStatus;
    }

    getSelectedWord() {
        return this.selectedWord;
    }


    // startTimer(callback) {
    //     this.stopTimer();
    //     this.timer = setTimeout(() => {
    //         callback();
    //         this.stopTimer();
    //     }, this.timerDuration);
    // }

    // stopTimer() {
    //     if (this.timer) {
    //         clearTimeout(this.timer);
    //         this.timer = null;
    //     }
    // }
    cancelTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
}
