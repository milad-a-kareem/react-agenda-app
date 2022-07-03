import Agendas from "./components/Agendas";
import Header from "./components/Header";

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Agendas />
    </div>
  );
}

export default App;
