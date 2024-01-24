import { checkEqualityByObjectProperty } from "@/utils/array-functions";
import { emit } from "./SimpleService";
import { gamesStore } from "./SubscriberConfigObjectStore";

export type TopPlayersSlice = {
  subscribers: Set<{ subscribe: () => void }>;
  slice: {
    topPlayers: TopPlayers;
    adultTopPlayers: TopPlayers;
  };
};

export type TopPlayers = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}[];

//To do, change type of the store.
const topPlayersSlice: TopPlayersSlice = {
  subscribers: new Set(),
  slice: { topPlayers: [], adultTopPlayers: [] },
};
gamesStore.set("topPlayersSlice", topPlayersSlice);

//My version of a basic selector function
export function selectTopChildPlayers() {
  const childPlayers = topPlayersSlice.slice.topPlayers.filter(
    (player) => player.age < 18
  );
  return childPlayers;
}

let topPlayers: TopPlayers = [];
let adultTopPlayers: TopPlayers = [];
function runOnInit() {
  topPlayers = topPlayersSlice.slice.topPlayers;
  adultTopPlayers = topPlayersSlice.slice.topPlayers.filter(
    (player) => player.age > 17
  );
  topPlayersSlice.slice.adultTopPlayers = adultTopPlayers; //Optional. Only needed if you want to
  //implement an equality function to prevent re-renders. May be overkill.
}
//My version of a memoized selector function
export function selectTopAdultPlayers() {
  let hasChanged = false;

  if (topPlayers === topPlayersSlice.slice.topPlayers) {
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
  const newAdultTopPlayers = topPlayersSlice.slice.topPlayers.filter(
    (player) => player.age > 17
  );
  const areEqual = checkEqualityByObjectProperty(
    newAdultTopPlayers,
    topPlayersSlice.slice.adultTopPlayers,
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
  adultTopPlayers = newAdultTopPlayers; //Looks strange, but is necessary to reinit adultToPlayers, which lives outside of this function.
  topPlayersSlice.slice.adultTopPlayers = adultTopPlayers; //Optional. Only needed if you want to
  //implement an equality function to prevent re-renders. May be overkill.
  topPlayers = topPlayersSlice.slice.topPlayers;
  return { adultTopPlayers, hasChanged };
}

//Hard-code this for testing. Would be called from a component.
export function addTopChildPlayer() {
  const newTopPlayers = topPlayersSlice.slice.topPlayers.slice();
  newTopPlayers.push({
    id: 8,
    firstName: "Cat",
    lastName: "Peterson",
    age: 12,
  });
  topPlayersSlice.slice.topPlayers = newTopPlayers;
  emit(topPlayersSlice);
}

//Hard-code this for testing. Would be called from a component.
export function addTopAdultPlayer() {
  const newTopPlayers = topPlayersSlice.slice.topPlayers.slice();
  newTopPlayers.push({ id: 7, firstName: "Paul", lastName: "Wesley", age: 18 });
  topPlayersSlice.slice.topPlayers = newTopPlayers;
  emit(topPlayersSlice);
}

const topPlayersArr: TopPlayers = [
  { id: 1, firstName: "Peter", lastName: "Smith", age: 15 },
  { id: 2, firstName: "Mark", lastName: "Evans", age: 19 },
  { id: 3, firstName: "Alice", lastName: "Wang", age: 17 },
  { id: 4, firstName: "Daisy", lastName: "Jones", age: 25 },
  { id: 5, firstName: "Tim", lastName: "Butcher", age: 22 },
  { id: 6, firstName: "Jane", lastName: "Bailey", age: 14 },
];

//Simulate a http request to pre-populate topPlayers. Could use generateStaticParams# here to increase speed.
setTimeout(() => {
  topPlayersSlice.slice.topPlayers = topPlayersArr;
  runOnInit();
  emit(topPlayersSlice);
}, 6000);

//No prop-drilling is needed
export default function TopPlayersSliceComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("TopPlayersSliceComponent rendered");
  return <> {children}</>;
}
