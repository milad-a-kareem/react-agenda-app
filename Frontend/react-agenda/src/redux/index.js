import agendaReducer from "./agenda-slice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: { agenda: agendaReducer },
});

export default store;
