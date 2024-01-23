import { emit } from "./SimpleService";
import { store } from "./SubscriberConfigObjectStore";
console.log("Slice has run");

export type TopPlayers = { firstName: string; lastName: string; age: number }[];

//To do, change type of the store.
const gamesSlice: {
  subscribers: Set<{ subscribe: () => void }>;
  slice: { games: string[]; topPlayers: TopPlayers };
} = {
  subscribers: new Set(),
  slice: { games: [], topPlayers: [] },
};
store.set("gamesSlice", gamesSlice);

export function addGame(gameTitle: string) {
  const newGames = gamesSlice.slice.games.slice();
  newGames.push(gameTitle);
  gamesSlice.slice.games = newGames;
  emit(gamesSlice);
}

//Only needed if you want to memoize selctor functions.
// let previousSlice = gamesSlice.slice;
// export function mutate(mutatorFn: () => void) {
//   mutatorFn();
//   previousSlice = gamesSlice.slice;
// }

//My version of a memoized selector function
let topPlayers = gamesSlice.slice.topPlayers;
let adultTopPlayers = gamesSlice.slice.topPlayers.filter(
  (player) => player.age > 17
);
export function selectTopAdultPlayers() {
  if (topPlayers === gamesSlice.slice.topPlayers) {
    console.log(
      "returning same adultTopPlayers because topPlayers array hasn't changed."
    );
    return adultTopPlayers;
  }
  console.log(
    "There has been a change in topPlayers array, running filter fn again."
  );

  adultTopPlayers = gamesSlice.slice.topPlayers.filter(
    (player) => player.age > 17
  );
  topPlayers = gamesSlice.slice.topPlayers;
  return adultTopPlayers;
}

//Hard-code this for now
export function addTopChildPlayer() {
  const newTopPlayers = gamesSlice.slice.topPlayers.slice();
  newTopPlayers.push({ firstName: "Cat", lastName: "Peterson", age: 12 });
  gamesSlice.slice.topPlayers = newTopPlayers;
  emit(gamesSlice);
}

export function addTopAdultPlayer() {
  const newTopPlayers = gamesSlice.slice.topPlayers.slice();
  newTopPlayers.push({ firstName: "Paul", lastName: "Wesley", age: 18 });
  gamesSlice.slice.topPlayers = newTopPlayers;
  emit(gamesSlice);
}

//My version of a basic selector function
export function selectTopChildPlayers() {
  const childPlayers = gamesSlice.slice.topPlayers.filter(
    (player) => player.age < 18
  );
  return childPlayers;
}

const topPlayersArr: TopPlayers = [
  { firstName: "Peter", lastName: "Smith", age: 15 },
  { firstName: "Mark", lastName: "Evans", age: 19 },
  { firstName: "Alice", lastName: "Wang", age: 17 },
  { firstName: "Daisy", lastName: "Jones", age: 25 },
  { firstName: "Tim", lastName: "Butcher", age: 22 },
  { firstName: "Jane", lastName: "Bailey", age: 14 },
];

//Simulate a http request to pre-populate games. Could use generateStaticParams# here to increase speed.
setTimeout(() => {
  gamesSlice.slice.games = ["Mario", "Fifa", "Doom"];
  gamesSlice.slice.topPlayers = topPlayersArr;
  emit(gamesSlice);
}, 3000);

export default function GamesSliceComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("GamesSliceCompnent rendered");
  return <> {children}</>;
}
