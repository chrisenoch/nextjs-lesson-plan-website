import { emit } from "./SimpleService";
import { store } from "./SubscriberConfigObjectStore";

type TopPlayers = { firstName: string; lastName: string; age: number }[];

console.log("Slice has run");
//To do, change type of the store.
const gamesSlice: {
  subscribers: Set<{ subscribe: () => void }>;
  games: string[];
  topPlayers: TopPlayers;
} = {
  subscribers: new Set(),
  games: [],
  topPlayers: [],
};
store.set("gamesSlice", gamesSlice);

export function addGame(gameTitle: string) {
  const newGames = gamesSlice.games.slice();
  newGames.push(gameTitle);
  gamesSlice.games = newGames;
  emit(gamesSlice);
}

//My version of a selector function
export function selectTopAdultPlayers() {
  //Could add reselect fucntionality here to check for changes? //perhaps every time we add, we add currentSlice fields to previousSliceFields.
  const adultPlayers = gamesSlice.topPlayers.filter(
    (player) => player.age > 17
  );
  return adultPlayers;
}

const topPlayers: TopPlayers = [
  { firstName: "Peter", lastName: "Smith", age: 15 },
  { firstName: "Mark", lastName: "Evans", age: 19 },
  { firstName: "Alice", lastName: "Wang", age: 17 },
  { firstName: "Daisy", lastName: "Jones", age: 25 },
  { firstName: "Tim", lastName: "Butcher", age: 22 },
  { firstName: "Jane", lastName: "Bailey", age: 14 },
];

//Simulate a http request to pre-populate games. Could use generateStaticParams# here to increase speed.
setTimeout(() => {
  gamesSlice.games = ["Mario", "Fifa", "Doom"];
  gamesSlice.topPlayers = topPlayers;
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
