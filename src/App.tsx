import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextInput,
  Select,
  Pill,
  Group,
  Button,
  Pagination,
  Container,
  Title,
  Stack,
  Flex,
  Text,
  Image,
} from "@mantine/core";
import "./App.css";
import type { RootState } from "./store/store";
import {
  fetchVacancies,
  setSearch,
  setArea,
  addSkill,
  removeSkill,
  setPage,
} from "./reducers/fetchSlice";
import type { AppDispatch } from "./store/store";
import { Header } from "./components/Header";
import Plus from "../public/Plus.svg";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { vacancies, loading, error, totalPages, page, search, area, skills } =
    useSelector((state: RootState) => state.fetch);

  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchVacancies());
    }, 600);
    return () => clearTimeout(timer);
  }, [dispatch, page, area, skills, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleAreaChange = (value: string | null) => {
    dispatch(setArea(value || ""));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      dispatch(addSkill(newSkill.trim()));
      setNewSkill("");
    }
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage - 1));
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
      <Header />

      <Container>
        <div className="titleSearch">
          <div className="title">
            <h2>Список вакансий</h2>
            <h3>по профессии Frontend-разработчик</h3>
          </div>
          <div className="search">
            <TextInput
              placeholder="Должность или название компании"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <Flex>
          <Stack w={400} style={{ width: "317px" }}>
            <Group
              style={{
                padding: "24px",
                backgroundColor: "white",
                borderRadius: "12px",
              }}
            >
              <Text size="m" fw={700}>
                Ключевые навыки
              </Text>

              <Group justify="space-between" style={{ width: "100%" }}>
                <TextInput
                  size="md"
                  placeholder="Навык"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <Button size="md" onClick={handleAddSkill}>
                  <Image src={Plus} w={16} h={16} />
                </Button>
              </Group>

              {skills.map((skill) => (
                <Pill
                  size="md"
                  key={skill}
                  withRemoveButton
                  onRemove={() => dispatch(removeSkill(skill))}
                >
                  {skill}
                </Pill>
              ))}
            </Group>

            <Select
              data={[
                { value: "", label: "Все города" },
                { value: "1", label: "Москва" },
                { value: "2", label: "Санкт-Петербург" },
              ]}
              value={area}
              onChange={handleAreaChange}
              style={{
                padding: "24px",
                backgroundColor: "white",
                borderRadius: "12px",
              }}
            />
          </Stack>

          <Stack w={660} style={{ alignItems: "center" }}>
            {vacancies.map((vacancy) => (
              <Stack
                className="vacancyCard"
                key={vacancy.id}
                style={{
                  border: "1px solid #dee2e6",
                  borderRadius: "8px",
                  padding: "20px",
                  backgroundColor: "white",
                }}
              >
                <Title order={3} mb="xs">
                  {vacancy.name}
                </Title>

                <Group>
                  {vacancy.salary && (
                    <p>
                      {vacancy.salary.from} - {vacancy.salary.to}{" "}
                      {vacancy.salary.currency}
                    </p>
                  )}
                  <p>Опыт: {vacancy.experience.name}</p>
                </Group>

                <span>{vacancy.employer.name}</span>

                <span>{vacancy.area.name}</span>

                <Group gap="md" mt="md">
                  <Button color="black">Смотреть вакансию</Button>
                  <Button color="lightgrey">
                    <span style={{ color: "black" }}>Откликнуться</span>
                  </Button>
                </Group>
              </Stack>
            ))}
          </Stack>
        </Flex>

        {totalPages > 0 && (
          <Pagination
            total={totalPages}
            value={page + 1}
            onChange={handlePageChange}
          />
        )}
      </Container>
    </>
  );
}

export default App;
