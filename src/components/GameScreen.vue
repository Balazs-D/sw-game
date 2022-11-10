<template>
  <div class="flex flex-col h-full justify-between text-white">
    <FailAlert v-show="alert" />
    <div class="mx-auto p-4 text-4xl bg-black/60 font-episode mb-4 rounded">
      A {{ game.selectedSide }} you are
    </div>
    <div
      class="grid grid-cols-5 place-items-center gap w-full h-3/5 bg-black/90 rounded text-white"
      :class="{
        'grid-cols-5': difficultyProperties.numberOfEnemies === 5,
        'grid-cols-6': difficultyProperties.numberOfEnemies === 6,
        'grid-cols-8': difficultyProperties.numberOfEnemies === 8,
      }"
    >
      <GameStartCountdown
        v-show="startCounter !== 0"
        :start-counter="startCounter"
      />

      <FightCard
        v-for="char in roundsCharacters"
        :key="char.id"
        :character="char"
        class="w-3/4"
        :card-state="char.cardState"
        @onShoot="handleShoot(char.id)"
      />
    </div>

    <button
      v-if="startCounter === 0"
      class="w-1/2 bg-slate-500 rounded mx-auto text-white p-2 border border-slate-500 hover:border-blue-500"
      @click="next"
    >
      No Enemy here. Move on! {{ roundStarted }}
    </button>
    <div class="w-full flex justify-between font-mono">
      <ScoreDisplay :score="score" />
      <LivesDisplay :fails="fails" />
      <GameRoundCountdown :count-down="countdown" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Character,
  GameEnd,
  OptionalDifficulty,
  OptionalGameStatus,
  OptionalSide,
} from '../types/types'
import { CardState } from './FightCard.vue'

export type GameCharacter = Character & { cardState: CardState }

export default {
  data() {
    return {
      countdown: 1200,
      startCounter: 3,
      fails: 3,
      game: this.$accessor.gameSettings,
      alert: false,
      rounds: 0,
      jediEnemiesCount: 0,
      notSithsCount: 0,
      jediConditions: [
        'Sith',
        'Battle Station Command',
        "Jabba Desilijic Tiure's criminal empire",
        "Boba Fett's syndicate",
        'Separatist Council',
        'First Order military',
        'Separatist Droid Army',
      ],
    }
  },
  computed: {
    roundStarted(): boolean {
      return this.startCounter === 0
    },
    score(): number {
      if (!this.$accessor.gameEndDetails) return 0
      return this.$accessor.gameEndDetails.score
    },
    currentArrayOfCharacters(): GameCharacter[] {
      const characters = this.$accessor.allCharacters

      for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i - 1))
        ;[characters[i], characters[j]] = [characters[j], characters[i]]
      }

      return characters.map((ch) => {
        return { ...ch, cardState: CardState.HIDDEN }
      })
    },
    roundsCharacters(): GameCharacter[] {
      const currSelection = this.currentArrayOfCharacters.slice(
        this.rounds,
        this.rounds + this.difficultyProperties.numberOfEnemies
      )

      if (this.startCounter === 0) {
        return currSelection.map((ch) => {
          return { ...ch, cardState: CardState.IN_GAME }
        })
      }
      return currSelection
    },
    difficultyProperties(): Object {
      let numberOfEnemies: number = 5
      let numberOfFails: number = 3
      switch (this.$accessor.gameSettings.gameDifficulty) {
        case OptionalDifficulty.EASY: {
          numberOfEnemies = 5
          numberOfFails = 3
          break
        }
        case OptionalDifficulty.MEDIUM: {
          numberOfEnemies = 6
          numberOfFails = 2
          break
        }
        case OptionalDifficulty.HARD:
          numberOfEnemies = 8
          numberOfFails = 0
      }
      return { numberOfEnemies, numberOfFails }
    },
  },

  watch: {
    startCounter: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.startCounter--
          }, 1000)
        } else {
          this.countEnemiesInCurrentGame()
        }
      },
      immediate: true,
    },
    countdown: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.countdown--
          }, 10)
        } else {
          this.$accessor.setGameState(OptionalGameStatus.GAME_END)
        }
      },
      immediate: true,
    },
    fails: {
      handler(value) {
        if (value === 0) {
          this.$accessor.setGameState(OptionalGameStatus.GAME_END)
        }
      },
    },
    alert: {
      handler(value) {
        if (value === true) {
          setTimeout(() => {
            this.alert = false
          }, 300)
        }
      },
    },
  },
  methods: {
    handleShoot(id) {
      const mode = this.$accessor.gameSettings.selectedSide
      const difficulty = this.$accessor.gameSettings.gameDifficulty
      const selectedChar = this.roundsCharacters.find((ch) => ch.id === id)

      if (this.startCounter !== 0) return

      if (mode === OptionalSide.JEDI) {
        this.jediShoot(selectedChar, difficulty)
      } else {
        this.sithShoot(selectedChar)
      }
    },
    jediShoot(char, diff) {
      const jediConditionsFound = this.jediConditions.some((cond) =>
        char.affiliations.includes(cond)
      )
      if (jediConditionsFound) {
        this.$accessor.setGameEndDetails({
          ...this.$accessor.gameEndDetails,
          score: this.$accessor.gameEndDetails.score + 1000,
        })
        char.cardState = CardState.GOTCHA
      } else if (diff === OptionalDifficulty.HARD) {
        this.$accessor.setGameState(OptionalGameStatus.GAME_END)
        this.$accessor.setGameEndDetails({
          ...this.$accessor.gameEndDetails,
          result: GameEnd.LOSER,
        })
      } else {
        char.cardState = CardState.FAIL
        this.alert = true
        this.fails--
        if (this.score === 0) return
        this.$accessor.setGameEndDetails({
          ...this.$accessor.gameEndDetails,
          score: this.$accessor.gameEndDetails.score - 1000,
        })

        this.$accessor.setGameEndDetails({
          ...this.$accessor.gameEndDetails,
          result: this.calculateGameEndResult().jediResult,
          maxScore: this.jediEnemiesCount * 1000,
        })
      }
    },
    sithShoot(char) {
      if (char.affiliations.includes('Sith')) {
        this.$accessor.setGameState(OptionalGameStatus.GAME_END)
        this.$accessor.setGameEndDetails({
          result: GameEnd.LOSER,
          score: this.score,
          gotchas: this.jediEnemiesCount,
        })
      } else {
        char.cardState = CardState.GOTCHA
        this.$accessor.setGameEndDetails({
          ...this.$accessor.gameEndDetails,
          score: this.$accessor.gameEndDetails.score + 1000,
        })
      }
      this.$accessor.setGameEndDetails({
        ...this.$accessor.gameEndDetails,
        result: this.calculateGameEndResult().sithResult,
        maxScore: this.notSithsCount * 1000,
      })
    },
    next() {
      const noMoreCharacters =
        this.currentArrayOfCharacters.length / this.rounds <
        this.difficultyProperties.numberOfEnemies

      if (noMoreCharacters) {
        this.$accessor.setGameState(OptionalGameStatus.GAME_END)
      }

      this.rounds = this.rounds + this.difficultyProperties.numberOfEnemies
    },
    calculateGameEndResult() {
      const sithResult: GameEnd =
        this.$accessor.gameEndDetails.score / this.notSithsCount === 1000
          ? GameEnd.WINNER
          : GameEnd.LOSER

      let jediResult: GameEnd

      jediResult =
        this.$accessor.gameEndDetails.score / this.jediEnemiesCount === 1000
          ? GameEnd.WINNER
          : GameEnd.LOSER

      if (this.jediEnemiesCount === 0) {
        jediResult = GameEnd.WINNER
        return
      }

      return { jediResult, sithResult }
    },
    countEnemiesInCurrentGame() {
      for (let i = 0; i < this.currentArrayOfCharacters.length; i++) {
        const jediConditionsFound = this.jediConditions.some((cond) =>
          this.currentArrayOfCharacters[i].affiliations.includes(cond)
        )

        if (jediConditionsFound) {
          this.jediEnemiesCount++
        } else if (!jediConditionsFound) {
          this.notSithsCount++
        }
      }
    },
  },
}
</script>
