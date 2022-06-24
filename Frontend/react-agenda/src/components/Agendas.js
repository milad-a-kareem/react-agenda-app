import React, { useEffect, useState } from "react";
import env from "../env";
import AgendaItem from "./AgendaItem";

import { IoSadOutline } from "react-icons/io5";
import { ReactComponent as LoadingIcon } from "../assets/rolling.svg";

function Agendas() {
  const [agendas, setAgendas] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(`${env.url}/agendas`)
      .then((res) => {
        if (!res.ok) {
          setIsError(true);
          setIsLoading(false);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setAgendas(data.agendas);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

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
        <LoadingIcon className="w-full h-full" />
      </div>
    </div>
  );
  return (
    <div className="px-4 sm:px-14 flex flex-col gap-4 py-4">
      {isloading && loading}
      {!isError && !isloading && !agendas.length > 0 && empty}
      {isError && error}
      {agendas.map((agenda) => {
        return <AgendaItem {...agenda} key={agenda._id} />;
      })}
    </div>
  );
}

export default Agendas;
