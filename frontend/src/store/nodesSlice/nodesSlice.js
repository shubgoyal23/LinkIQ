import { createSlice } from "@reduxjs/toolkit";

export const nodesSlice = createSlice({
   name: "nodes",
   initialState: {
      nodes: [],
   },
   reducers: {
      addNode: (state, payload) => {
         state.nodes.push(payload.payload);
      },
      removeNode: (state, payload) => {
         state.nodes = state.nodes.filter((node) => node.id !== payload.payload);
      },
   },
});

export const { addNode, removeNode } = nodesSlice.actions;

export default nodesSlice.reducer;
