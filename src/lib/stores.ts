import { writable } from "svelte/store";

interface Player {
  name: string;
  time: number;
  eliminated: boolean;
}

interface Game {
  players: Player[];
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
      name: `Spieler ${i + 1}`,
      time: initialTime,
      eliminated: false,
    })),
    activePlayer: 0,
    paused: true,
  });

  const next = () => {
    console.log("next");
    update((game) => {
      let nextIndex = game.activePlayer;

      if (game.activePlayer === 0) {
        nextIndex = 1;
      } else if (game.activePlayer % 2 !== 0) {
        if (game.activePlayer === game.players.length - 1) {
          nextIndex = players - 2;
        } else {
          if (nextIndex + 2 >= game.players.length) {
            nextIndex += 1;
          } else {
            nextIndex += 2;
          }
        }
      } else {
        nextIndex -= 2;
      }

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

  return {
    subscribe,
    set,
    update,
    next,
    tick,
  };
};
