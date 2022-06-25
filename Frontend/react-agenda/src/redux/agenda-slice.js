import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import env from "../env";

export const getAgendas = createAsyncThunk(
  "agenda/getAgendas",
  async (thunkAPI) => {
    const res = await fetch(`${env.url}/agendas`).then((data) => {
      if (!data.ok) {
        throw "Rejected";
      } else {
        return data.json();
      }
    });
    return res;
  }
);
export const importAgendas = createAsyncThunk(
  "agenda/importAgendas",
  async (formData) => {
    const res = await fetch(`${env.url}/agendas/import`, {
      method: "POST",
      body: formData,
    }).then((data) => {
      if (!data.ok) {
        throw "Rejected";
      } else {
        return data.json();
      }
    });
    return res;
  }
);
export const addAgenda = createAsyncThunk(
  "agenda/addAgenda",
  async (agenda) => {
    const res = await fetch(`${env.url}/agendas/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `title=${agenda.title}&description=${agenda.description}&status=${agenda.status}&dateTime=${agenda.dateTime}`,
    }).then((data) => {
      if (!data.ok) {
        throw "Rejected";
      } else {
        return data.json();
      }
    });
    return res;
  }
);
export const removeAgenda = createAsyncThunk(
  "agenda/removeAgenda",
  async (agendaId) => {
    const res = await fetch(`${env.url}/agendas/${agendaId}`, {
      method: "delete",
    }).then((data) => {
      if (!data.ok) {
        throw "Rejected";
      } else {
        return agendaId;
      }
    });
    return res;
  }
);
export const updateAgenda = createAsyncThunk(
  "agenda/updateAgenda",
  async (agenda) => {
    console.log(agenda);
    const res = await fetch(`${env.url}/agendas/${agenda._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `title=${agenda.title}&description=${agenda.description}&status=${agenda.status}&dateTime=${agenda.dateTime}`,
    }).then((data) => {
      if (!data.ok) {
        throw "Rejected";
      } else {
        return data.json();
      }
    });
    return res;
  }
);

const agendaSlice = createSlice({
  name: "agenda",
  initialState: {
    agendas: [],
    loadings: {
      getAll: false,
      addOne: false,
      delOne: false,
      updateOne: false,
      import: false,
    },
    errors: {
      getAll: false,
      addOne: false,
      delOne: false,
      updateOne: false,
      import: false,
    },
  },
  reducers: {},
  extraReducers: {
    //get all agendas
    [getAgendas.pending]: (state) => {
      state.loadings.getAll = true;
      state.errors.getAll = false;
    },
    [getAgendas.fulfilled]: (state, { payload }) => {
      state.loadings.getAll = false;
      state.agendas = payload.agendas;
    },
    [getAgendas.rejected]: (state) => {
      state.loadings.getAll = false;
      state.errors.getAll = true;
    },

    //add new agenda
    [addAgenda.pending]: (state) => {
      state.loadings.addOne = true;
      state.errors.addOne = false;
    },
    [addAgenda.fulfilled]: (state, { payload }) => {
      state.loadings.addOne = false;
      state.agendas.unshift(payload.newAgenda);
    },
    [addAgenda.rejected]: (state) => {
      state.loadings.addOne = false;
      state.errors.addOne = true;
    },

    //update agenda
    [updateAgenda.pending]: (state) => {
      state.loadings.updateOne = true;
      state.errors.updateOne = false;
    },
    [updateAgenda.fulfilled]: (state, { payload }) => {
      const index = state.agendas.findIndex(
        (agenda) => agenda._id === payload.newAgenda._id
      );
      state.agendas[index] = payload.newAgenda;
      state.loadings.updateOne = false;
    },
    [updateAgenda.rejected]: (state) => {
      state.loadings.updateOne = false;
      state.errors.updateOne = true;
    },
    //remove agenda
    [removeAgenda.pending]: (state) => {
      state.loadings.delOne = true;
      state.errors.delOne = false;
    },
    [removeAgenda.fulfilled]: (state, { payload }) => {
      const index = state.agendas.findIndex((agenda) => agenda._id === payload);
      state.agendas.splice(index, 1);
      state.loadings.delOne = false;
    },
    [removeAgenda.rejected]: (state) => {
      state.loadings.delOne = false;
      state.errors.delOne = true;
    },
    //import agendas
    [importAgendas.pending]: (state) => {
      state.loadings.import = true;
      state.errors.import = false;
    },
    [importAgendas.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.agendas = [...payload.importedAgendas, ...state.agendas];
      state.loadings.import = false;
    },
    [importAgendas.rejected]: (state) => {
      state.loadings.import = false;
      state.errors.import = true;
    },
  },
});

export const agendaActions = agendaSlice.actions;
export default agendaSlice.reducer;
