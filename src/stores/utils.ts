import { gamesDatasetMap } from '@/lib/dataset/games'
import { getFirstGameForDex, pokedexBasicInfoMap } from '@/lib/dataset/pokedexes'
import type { TrGame, TrPokedexBasicInfo } from '@/lib/dataset/types'
import type { DexTrackerState } from './types/state'

export function summarizeDexTrackerData(state: DexTrackerState) {
  const dexCount = Object.keys(state.dexes).length
  const hasBoxes = state.sharedBox !== undefined
  const hasTrainerData = state.trainer !== undefined
  const hasDexes = dexCount > 0

  return {
    dexCount,
    hasDexes,
    hasBoxes,
    hasTrainerData,
    hasData: hasDexes || hasBoxes || hasTrainerData,
  }
}

export function getFullDexId(gameId: string, dexId: string): string | undefined {
  const game = gamesDatasetMap.get(gameId)
  const dex = pokedexBasicInfoMap.get(dexId)
  if (!game || !dex) {
    return undefined
  }
  if (!dex.gameIds.includes(gameId)) {
    return undefined
  }
  return `${dexId}_${gameId}`
}

export function splitFullDexId(fullDexId: string): {
  dexId: string
  gameId: string
} {
  const [dexId, gameVersionId] = fullDexId.split('_', 2)

  return {
    dexId,
    gameId: gameVersionId,
  }
}

export function getDexAndGameData(fullDexId: string | undefined):
  | {
      dex: TrPokedexBasicInfo
      game: TrGame
    }
  | undefined {
  if (!fullDexId) {
    return
  }

  const ids = splitFullDexId(fullDexId)

  const dex = ids.dexId ? pokedexBasicInfoMap.get(ids.dexId) : undefined
  if (!dex) {
    throw new Error(`Invalid dex ID in '${fullDexId}'. Dex data not found.`)
  }

  const game = gamesDatasetMap.get(ids.gameId ?? '') ?? getFirstGameForDex(dex.id)
  if (!game) {
    throw new Error(`Invalid game ID in '${ids.gameId}'. Game data not found.`)
  }

  return {
    dex,
    game,
  }
}
