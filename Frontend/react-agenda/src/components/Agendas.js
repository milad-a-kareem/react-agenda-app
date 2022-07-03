import React, { useEffect } from "react";
import AgendaItem from "./AgendaItem";

import { IoSadOutline } from "react-icons/io5";
import { ReactComponent as LoadingIcon } from "../assets/rolling.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAgendas } from "../redux/agenda-slice";

function Agendas() {
  const agendas = useSelector((state) => state.agenda.agendas);
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.agenda.loadings.getAll);
  const isError = useSelector((state) => state.agenda.errors.getAll);

  useEffect(() => {
    dispatch(getAgendas());
  }, [dispatch]);

  const empty = (
    <h2 className="rounded-lg bg-orange-300 p-4 text-lg text-center">
      No Agendas yet! Click Add Button to Add One.
    </h2>
  );
  const error = (
    <h2 className="rounded-lg bg-red-300 p-4 text-lg text-center flex items-center justify-center flex-wrap content-center gap-1">
      <IoSadOutline className="text-xl" />
      There is a problem with the server. Please, try again later.
    </h2>
  );

  const loading = (
    <div className="flex w-full items-center justify-center p-4">
      <div className="animate-spin w-20 h-20">
        <LoadingIcon className="w-full h-full stroke-blue-800" />
      </div>
    </div>
  );
  return (
    <div className="px-4 sm:px-14 flex flex-col gap-4 py-4">
      {isloading && loading}
      {!isError && !isloading && agendas && !agendas.length > 0 && empty}
      {isError && error}
      {agendas &&
        agendas.map((agenda) => {
          return <AgendaItem {...agenda} key={agenda._id} />;
        })}
    </div>
  );
}

export default Agendas;
