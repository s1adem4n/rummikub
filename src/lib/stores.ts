import { writable, derived } from "svelte/store";

interface Player {
  id: number;
  time: number;
  eliminated: boolean;
}

interface Game {
  players: Player[];
  sortedPlayers: Player[];
  activePlayer: number;
  paused: boolean;
}

export type GameStore = ReturnType<typeof createGameStore>;

export const createGameStore = ({
  players,
  initialTime,
}: {
  players: number;
  initialTime: number;
}) => {
  const { subscribe, set, update } = writable<Game>({
    players: Array.from({ length: players }, (_, i) => ({
      id: i,
      time: initialTime,
      eliminated: false,
    })),
    sortedPlayers: [],
    activePlayer: 0,
    paused: false,
  });

  const next = () => {
    update((game) => {
      let nextIndex = (game.activePlayer + 1) % game.players.length;

      if (game.players[nextIndex].eliminated) {
        next();
        return game;
      }

      game.activePlayer = nextIndex;
      return game;
    });
  };

  const tick = () => {
    update((game) => {
      if (game.paused) return game;

      const activePlayer = game.players[game.activePlayer];
      if (!activePlayer) return game;

      if (activePlayer.time <= 0) {
        activePlayer.eliminated = true;
        if (game.players.filter((player) => !player.eliminated).length === 1) {
          next();
          game.paused = true;
        } else {
          next();
        }
        return game;
      }

      activePlayer.time--;
      return game;
    });
  };

  const reset = () => {
    update((game) => {
      game.players.forEach((player) => {
        player.eliminated = false;
        player.time = initialTime;
      });
      game.activePlayer = 0;
      game.paused = true;
      return game;
    });
  };

  return {
    subscribe,
    set,
    update,
    next,
    tick,
    reset,
  };
};

export const createSortedPlayersStore = (gameStore: GameStore) => {
  return derived(gameStore, ($game) => {
    const players = $game.players.length;
    const sortedPlayers: Player[] = [];
    const map = [0];

    // TODO: this is very ugly, but no brain for this sh*t :/
    while (map.length < players) {
      const current = map.at(-1)!;
      let nextIndex = current;
      if (current === 0) {
        nextIndex = 1;
      } else if (current % 2 !== 0) {
        if (current === players - 1) {
          nextIndex = players - 2;
        } else {
          if (nextIndex + 2 >= players) {
            nextIndex += 1;
          } else {
            nextIndex += 2;
          }
        }
      } else {
        nextIndex -= 2;
      }

      map.push(nextIndex);
    }
    map.forEach((index, i) => {
      sortedPlayers[index] = $game.players[i];
    });
    return sortedPlayers;
  });
};
