import { ActionTree, Commit, GetterTree, MutationTree } from 'vuex'
import { getAccessorType } from 'typed-vuex'
import {
  Character,
  GameEnd,
  OptionalDifficulty,
  OptionalGameStatus,
  OptionalSide,
} from '../types/types'
import { imagelessChars } from '../constants/imagelessChars'

// Import all your submodules
// import * as submodule from './submodule'

// Keep your existing vanilla Vuex code for state, getters, mutations, actions, plugins, etc.
// ...

export interface State {
  allCharacters: Character[]
  gameSettings: {
    gameStatus: OptionalGameStatus
    gameDifficulty: OptionalDifficulty
    selectedSide: OptionalSide
  }
  gameEndDetails: {
    result: GameEnd | null
    score: Number
    maxScore: Number
  }
}

export const state = (): State => ({
  allCharacters: [],
  gameSettings: {
    gameStatus: OptionalGameStatus.START,
    gameDifficulty: OptionalDifficulty.EASY,
    selectedSide: OptionalSide.JEDI,
  },
  gameEndDetails: {
    result: null,
    score: 0,
    maxScore: 0,
  },
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  allCharacters(state) {
    return state.allCharacters
  },
}

export const mutations: MutationTree<RootState> = {
  setAllCharacters(state: State, payload: Character[]) {
    state.allCharacters = payload
  },
  setSelectedSide(state: State, payload: OptionalSide) {
    state.gameSettings = {
      ...state.gameSettings,
      selectedSide: payload,
      gameStatus: OptionalGameStatus.SIDE_CHOSEN,
    }
  },
  setSelectedDifficulty(state: State, payload: OptionalDifficulty) {
    state.gameSettings = {
      ...state.gameSettings,
      gameDifficulty: payload,
      gameStatus: OptionalGameStatus.DIFF_CHOSEN,
    }
  },
  setGameState(state: State, payload: OptionalGameStatus) {
    state.gameSettings = { ...state.gameSettings, gameStatus: payload }
  },
  setGameEndDetails(state: State, payload: State['gameEndDetails']) {
    state.gameEndDetails = payload
  },
  resetGame(state: State) {
    state.gameEndDetails = {
      result: null,
      score: 0,
      maxScore: 0,
    }
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async getAllCharacters({ commit }: { commit: Commit }) {
    const res = await this.$axios.get('/all.json')

    const result = res.data.filter(
      (char: Character) => !imagelessChars.includes(char.id)
    )

    commit('setAllCharacters', result)
  },
}

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
    // submodule,
  },
})
