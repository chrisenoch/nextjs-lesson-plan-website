import { checkEqualityByObjectProperty } from "@/utils/array-functions";
import { emit } from "./SimpleService";
import { store } from "./SubscriberConfigObjectStore";
console.log("Slice has run");

export type TopPlayers = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}[];

//To do, change type of the store.
const gamesSlice: {
  subscribers: Set<{ subscribe: () => void }>;
  slice: {
    games: string[];
    topPlayers: TopPlayers;
    adultTopPlayers: TopPlayers;
  };
} = {
  subscribers: new Set(),
  slice: { games: [], topPlayers: [], adultTopPlayers: [] },
};
store.set("gamesSlice", gamesSlice);

export function addGame(gameTitle: string) {
  const newGames = gamesSlice.slice.games.slice();
  newGames.push(gameTitle);
  gamesSlice.slice.games = newGames;
  emit(gamesSlice);
}

//My version of a basic selector function
export function selectTopChildPlayers() {
  const childPlayers = gamesSlice.slice.topPlayers.filter(
    (player) => player.age < 18
  );
  return childPlayers;
}

//My version of a memoized selector function
let topPlayers: TopPlayers = [];
let adultTopPlayers: TopPlayers = [];
function runOnInit() {
  console.log("gamesSlice in runOnInit");
  console.log(JSON.stringify(gamesSlice));

  topPlayers = gamesSlice.slice.topPlayers;
  adultTopPlayers = gamesSlice.slice.topPlayers.filter(
    (player) => player.age > 17
  );
  console.log("adultTopPlayers before selectTopAdultPlayers function");
  console.log(adultTopPlayers);
  gamesSlice.slice.adultTopPlayers = adultTopPlayers; //Optional. Only needed if you want to
  //implement an equality function to prevent re-renders. May be overkill.
}

export function selectTopAdultPlayers() {
  let hasChanged = false;

  if (topPlayers === gamesSlice.slice.topPlayers) {
    console.log(
      "returning same adultTopPlayers because topPlayers array hasn't changed."
    );
    return { adultTopPlayers, hasChanged };
  }
  console.log(
    "There has been a change in topPlayers array, running filter fn again."
  );

  //Although topPlayers has changed, adultTopPlayers may not have changed. You can implement
  //an equality function here if you wish to check and prevent an unnecessary re-render.
  const newAdultTopPlayers = gamesSlice.slice.topPlayers.filter(
    (player) => player.age > 17
  );
  const areEqual = checkEqualityByObjectProperty(
    newAdultTopPlayers,
    gamesSlice.slice.adultTopPlayers,
    "id"
  );

  console.log("value of areEqual: " + areEqual);
  if (areEqual) {
    //Do not change object reference
    return { adultTopPlayers, hasChanged };
  }
  console.log("adult topPlayers equality function failed.");
  hasChanged = true;

  //Only run some expensive function if topPlayers has changed.
  //(Imagine this is an expensive function)
  adultTopPlayers = newAdultTopPlayers;
  gamesSlice.slice.adultTopPlayers = adultTopPlayers; //Optional. Only needed if you want to
  //implement an equality function to prevent re-renders. May be overkill.
  topPlayers = gamesSlice.slice.topPlayers;
  return { adultTopPlayers, hasChanged };
}

//Hard-code this for testing. Would be called fom cmponent.
export function addTopChildPlayer() {
  const newTopPlayers = gamesSlice.slice.topPlayers.slice();
  newTopPlayers.push({
    id: 8,
    firstName: "Cat",
    lastName: "Peterson",
    age: 12,
  });
  gamesSlice.slice.topPlayers = newTopPlayers;
  emit(gamesSlice);
}

//Hard-code this for testing. Would be called fom cmponent.
export function addTopAdultPlayer() {
  const newTopPlayers = gamesSlice.slice.topPlayers.slice();
  newTopPlayers.push({ id: 7, firstName: "Paul", lastName: "Wesley", age: 18 });
  gamesSlice.slice.topPlayers = newTopPlayers;
  emit(gamesSlice);
}

const topPlayersArr: TopPlayers = [
  { id: 1, firstName: "Peter", lastName: "Smith", age: 15 },
  { id: 2, firstName: "Mark", lastName: "Evans", age: 19 },
  { id: 3, firstName: "Alice", lastName: "Wang", age: 17 },
  { id: 4, firstName: "Daisy", lastName: "Jones", age: 25 },
  { id: 5, firstName: "Tim", lastName: "Butcher", age: 22 },
  { id: 6, firstName: "Jane", lastName: "Bailey", age: 14 },
];

//Simulate a http request to pre-populate games. Could use generateStaticParams# here to increase speed.
setTimeout(() => {
  gamesSlice.slice.games = ["Mario", "Fifa", "Doom"];
  gamesSlice.slice.topPlayers = topPlayersArr;
  runOnInit();
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
