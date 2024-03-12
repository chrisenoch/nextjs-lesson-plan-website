import { checkEqualityByObjectProperty } from "@/utils/array-functions";
import { emit } from "./SubscriberService";
import { gamesStore } from "./SubscriberConfigObjectStore";
import { getId } from "./id-store";
import { delay } from "@/utils/delay";

const topPlayersSlice: TopPlayersSlice = {
  subscribers: new Set(),
  slice: { topPlayers: [], adultTopPlayers: [] }, //AdultTopPlayers is only needed here because we use an equality check. If other cases,
  //you can just derive the state in the selector function. (See: selectTopChildPlayers for an example).
};
gamesStore.set("topPlayersSlice", topPlayersSlice);

// This is for the equality check in selectAdultTopPlayers# If you do not have equality checks, you do not need this.
// I chose the name 'previous' because developers are used to comparing the previous value to the current value to see if there has been a change.
// We always use this object for values that are needed for equality checks. runOnInit# initialises this object.
const previous: {
  topPlayers: TopPlayers;
  adultTopPlayers: TopPlayers;
} = {
  topPlayers: [],
  adultTopPlayers: [],
};

//A basic selector function
export function selectTopChildPlayers() {
  const childPlayers = topPlayersSlice.slice.topPlayers.filter(
    (player) => player.age < 18
  );
  return childPlayers;
}

//A memoized selector function; similar to Reselect.
export function selectTopAdultPlayers() {
  let hasChanged = false;

  // This is only needed if we have something unrelated to topPlayers in this slice.
  // E.g. If we had another array called topPlayerTips, this check would ensure that when topPlayers*Tips* is updated,
  // subscribers to this slice who are only interested in topPlayers, will recieve the variable 'hasChanged' equal to false.
  // They can use this information to decide to *not* re-render. Another option is to create a separate slice.
  // This check also stops expensive selector functions from being called if topPlayers has not changed.
  if (previous.topPlayers === topPlayersSlice.slice.topPlayers) {
    console.log(
      "Returning same adultTopPlayers because topPlayers array hasn't changed."
    );
    return { adultTopPlayers: previous.adultTopPlayers, hasChanged };
  }
  console.log(
    "There has been a change in topPlayers array, running filter fn again."
  );

  //Imagine this is an expensive function. It will only run if topPlayersSlice.slice.topPlayers has changed.
  const newAdultTopPlayers = topPlayersSlice.slice.topPlayers.filter(
    (player) => player.age > 17
  );
  //Although topPlayers has changed, adultTopPlayers may not have changed. Here, we implement
  //an equality function to prevent an unnecessary re-render.
  const adultTopPlayersIsSame = checkEqualityByObjectProperty(
    newAdultTopPlayers,
    topPlayersSlice.slice.adultTopPlayers,
    "id"
  );
  console.log("adultTopPlayersIsSame: " + adultTopPlayersIsSame);
  if (adultTopPlayersIsSame) {
    //Do not change object reference to previous.adultTopPlayers. If React sees the same object reference, it will not re-render the observing component.
    return { adultTopPlayers: previous.adultTopPlayers, hasChanged }; //The observing components can use the value of hasChanged to prevent unnecessary re-renders.
  }
  console.log("adult topPlayers equality function failed.");
  hasChanged = true;
  topPlayersSlice.slice.adultTopPlayers = newAdultTopPlayers;

  previous.adultTopPlayers = newAdultTopPlayers; //Needed because we implement an equality check. You do not need this if you do not implement an equality check.
  previous.topPlayers = topPlayersSlice.slice.topPlayers; //Needed because we implement an equality check. You do not need this if you do not implement an equality check.
  return { adultTopPlayers: previous.adultTopPlayers, hasChanged };
}

export function addTopChildPlayer() {
  const newTopPlayers = topPlayersSlice.slice.topPlayers.slice();
  //Hard-coded for testing. The information would be provided by a component.
  newTopPlayers.push({
    id: getId(), //Just for dev , to keep unique ids.
    firstName: "Cat",
    lastName: "Peterson",
    age: 12,
  });
  topPlayersSlice.slice.topPlayers = newTopPlayers;
  emit(topPlayersSlice);
}

export function addTopAdultPlayer() {
  const newTopPlayers = topPlayersSlice.slice.topPlayers.slice();
  //Hard-coded for testing. The information would be provided by a component.
  newTopPlayers.push({
    id: getId(), //Just for dev , to keep unique ids.
    firstName: "Paul",
    lastName: "Wesley",
    age: 18,
  });
  topPlayersSlice.slice.topPlayers = newTopPlayers;
  emit(topPlayersSlice);
}

export function selectTopPlayersSlice() {
  return topPlayersSlice.slice;
}

export function selectTopPlayers() {
  return topPlayersSlice.slice.topPlayers;
}

const topPlayersInit: TopPlayers = [
  { id: 1, firstName: "Peter", lastName: "Smith", age: 15 },
  { id: 2, firstName: "Mark", lastName: "Evans", age: 19 },
  { id: 3, firstName: "Alice", lastName: "Wang", age: 17 },
  { id: 4, firstName: "Daisy", lastName: "Jones", age: 25 },
  { id: 5, firstName: "Tim", lastName: "Butcher", age: 22 },
  { id: 6, firstName: "Jane", lastName: "Bailey", age: 14 },
];

function runOnInit(topPlayersInit: TopPlayers) {
  topPlayersSlice.slice.topPlayers = topPlayersInit;
  //Below is only needed if you use an equality function to prevent re-renders.
  previous.topPlayers = topPlayersInit;
  previous.adultTopPlayers = topPlayersInit.filter((player) => player.age > 17);
  topPlayersSlice.slice.adultTopPlayers = previous.adultTopPlayers;
}

let hasInit = false;
export async function initTopPlayersSlice() {
  if (!hasInit) {
    //Simulate a http request to pre-populate top players. Could use generateStaticParams# here to increase speed.
    await delay(() => {
      runOnInit(topPlayersInit);
      emit(topPlayersSlice);
    }, 1000);
    hasInit = true;
  }
  return topPlayersSlice.slice;
}

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
