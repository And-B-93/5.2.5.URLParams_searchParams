import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TextInput,
  Select,
  Pill,
  Group,
  Button,
  Pagination,
  Container,
  Stack,
  Flex,
  Text,
} from "@mantine/core";
import "./Vacancies.css";
import type { RootState } from "../store/store";
import {
  fetchVacancies,
  setSearch,
  setArea,
  addSkill,
  removeSkill,
  setPage,
} from "../reducers/fetchSlice";
import type { AppDispatch } from "../store/store";
import { IconMapPin, IconPlus, IconSearch } from "@tabler/icons-react";
import { Spinner } from "../components/Spinner";
import { VacancyCard } from "../components/VacancyCard";

function Vacancies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const { vacancies, loading, error, totalPages, page, search, area, skills } =
    useSelector((state: RootState) => state.fetch);

  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlArea = searchParams.get("city") || "";
    const urlSkills = searchParams.get("skills")?.split(",") || [
      "TypeScript",
      "React",
      "Redux",
    ];

    if (urlSearch) dispatch(setSearch(urlSearch));
    if (urlArea) dispatch(setArea(urlArea));
    if (urlSkills.length) {
      urlSkills.map((skill) => dispatch(addSkill(skill)));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (area) params.set("city", area);
    if (skills.length) params.set("skills", skills.join(","));
    setSearchParams(params);
  }, [search, area, skills]);

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch, page, area, skills]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleSearchClick = () => {
    dispatch(fetchVacancies());
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  if (loading) return <Spinner />;
  if (error)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Ошибка: {error}
      </div>
    );

  const iconMap = <IconMapPin />;
  const iconSearch = <IconSearch />;
  const iconPlus = <IconPlus />;
  return (
    <>
      <Container size={1100}>
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
              leftSection={iconSearch}
              style={{ width: "100%", marginRight: "24px" }}
            />
            <div>
              <Button onClick={handleSearchClick}>Найти</Button>
            </div>
          </div>
        </div>

        <Flex
          gap="xs"
          justify="center"
          align="flex-start"
          direction="row"
          wrap="nowrap"
        >
          <Stack
            w={317}
            style={{
              margin: "0 12px",
            }}
          >
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

              <Group justify="center">
                <TextInput
                  size="sm"
                  placeholder="Навык"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <Button onClick={handleAddSkill}>{iconPlus}</Button>
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
              leftSection={iconMap}
              style={{
                padding: "24px",
                backgroundColor: "white",
                borderRadius: "12px",
              }}
            />
          </Stack>

          <Stack style={{ alignItems: "center" }}>
            {vacancies.map((vacancy) => (
              <VacancyCard vacancy={vacancy} key={vacancy.id} />
            ))}
            {totalPages > 0 && (
              <Pagination.Root
                total={totalPages}
                onChange={handlePageChange}
                value={page + 1}
                style={{ margin: "24px" }}
              >
                <Group gap={5} justify="center">
                  <Pagination.First />
                  <Pagination.Previous />
                  <Pagination.Items />
                  <Pagination.Next />
                  <Pagination.Last />
                </Group>
              </Pagination.Root>
            )}
          </Stack>
        </Flex>
      </Container>
    </>
  );
}

export default Vacancies;
