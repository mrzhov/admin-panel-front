import { useReducer } from 'react';

export default function(initialState) {
  return useReducer(
    (state, update) => ({ ...state, ...update }),
    initialState
  );
}
