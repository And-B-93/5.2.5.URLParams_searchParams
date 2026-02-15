import Vacancies from "./pages/Vacancies";
import { Header } from "./components/Header";
import { SnippetVacancy } from "./pages/SnippetVacancy";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Vacancies />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/vacancies/:id" element={<SnippetVacancy />} />
      </Routes>
    </>
  );
}

export default App;
