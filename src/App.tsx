import Vacancies from "./pages/Vacancies";
import { Header } from "./components/Header";
import { DescriptionVacancy } from "./pages/DescriptionVacancy";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Vacancies />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/vacancies/:id" element={<DescriptionVacancy />} />
      </Routes>
    </>
  );
}

export default App;
