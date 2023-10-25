import { writable } from "svelte/store";

interface Player {
  name: string;
  time: number;
  eliminated: boolean;
}

interface Game {
  players: Player[];
  activePlayer: string;
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
    activePlayer: `Spieler 1`,
    paused: true,
  });

  const next = () => {
    console.log("next");
    update((game) => {
      const activePlayerIndex = game.players.findIndex(
        (player) => player.name === game.activePlayer
      );
      let next = (activePlayerIndex + 1) % game.players.length;
      while (game.players[next].eliminated) {
        next = (next + 1) % game.players.length;
      }
      game.activePlayer = game.players[next].name;
      return game;
    });
  };

  const tick = () => {
    update((game) => {
      if (game.paused) return game;
      const activePlayer = game.players.find(
        (player) => player.name === game.activePlayer
      );
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
      activePlayer.time -= 1;
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
