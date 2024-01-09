import { createSlice } from "@reduxjs/toolkit";
const initialState: {
  currentPath: null | string;
  previousPath: null | string;
  pathnameCallbacks: { [key: string]: () => void };
} = {
  currentPath: null,
  previousPath: null,
  pathnameCallbacks: {},
};

const navSlice = createSlice({
  name: "navSlice",
  initialState,
  reducers: {
    //To do: Just use this to add to map
    updatePathname(state, action) {
      const currentPath = action.payload;
      if (!state.previousPath) {
        state.currentPath = action.payload;
        state.previousPath = action.payload;
      } else if (state.previousPath !== currentPath) {
        console.log("previousPath in updatePathname BEFORE update");
        console.log(state.previousPath);

        const callback = callbacks.get(state.previousPath)
          ? callbacks.get(state.previousPath)
          : callbacks.get(state.previousPath + "/");
        console.log("callback: " + callback);
        callback && callback();

        state.previousPath = state.currentPath;
        console.log("previousPath in updatePathname after update");
        console.log(state.previousPath);

        state.currentPath = currentPath;

        console.log("callbacks size: " + callbacks.size);
        console.log("callbacks below");
        console.log(callbacks);
        console.log("currentPath and state.currentPath in updatePathname");
        console.log(currentPath + " " + state.currentPath);
      }
    },

    //To do:  Function: Detect when path in map is left and fire function
    //If path changes:
    //

    updatePathnameCallbacks(state, action) {
      const pathname = action.payload.pathname;
      const callback = action.payload.callback;
      //state.pathnameCallbacks[pathname] = callback;
      callbacks.set(pathname, callback);

      console.log("callbacks after set");
      console.log(callbacks);
    },
  },
});
export const { updatePathname, updatePathnameCallbacks } = navSlice.actions;
export const navReducer = navSlice.reducer;
// export const selectPathnameCallbacks = (state) =>
//   state.navSlice.pathnameCallbacks;

//create a hook
//add path and function to map

// dispatch(
//----pathName
//----callback
// );
console.log("exporting callbacks");
export const callbacks = new Map();
