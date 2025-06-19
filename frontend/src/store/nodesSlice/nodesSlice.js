import { createSlice } from "@reduxjs/toolkit";

export const nodesSlice = createSlice({
   name: "flow",
   initialState: {
      workspace: "",
      nodes: [],
      edges: [],
   },
   reducers: {
      setWorkspace: (state, payload) => {
         state.workspace = payload.payload;
      },
      addNode: (state, payload) => {
         state.nodes.push(payload.payload);
      },
      removeNode: (state, payload) => {
         state.nodes = state.nodes.filter((node) => node.id !== payload.payload);
      },
      addEdge: (state, payload) => {
         state.edges.push(payload.payload);
      },
      removeEdge: (state, payload) => {
         state.edges = state.edges.filter((edge) => edge.id !== payload.payload);
      },
   },
});

export const { setWorkspace, addNode, removeNode, addEdge, removeEdge } = nodesSlice.actions;

export default nodesSlice.reducer;
