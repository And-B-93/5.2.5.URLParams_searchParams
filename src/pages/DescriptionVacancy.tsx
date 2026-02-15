import { useNavigate, useParams } from "react-router-dom";
import type { Vacancy } from "../types/types";
import { useEffect, useState } from "react";
import { Button, Container, Text } from "@mantine/core";
import ky from "ky";
import { Spinner } from "../components/Spinner";
import { VacancyCard } from "../components/VacancyCard";

export function DescriptionVacancy() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    console.log("DescriptionVacancy получил id:", id);
    const fetchVacancy = async () => {
      try {
        setLoading(true);
        const data = await ky
          .get(`https://api.hh.ru/vacancies/${id}`)
          .json<Vacancy>();
        setVacancy(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Oшибка");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchVacancy();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <Text c="red">{error}</Text>;
  if (!vacancy) return <Text>Вакансия не найдена</Text>;

  return (
    <Container size="1100px" py="xl">
      <Button variant="subtle" onClick={() => navigate(-1)} mb="lg">
        Назад к списку вакансий
      </Button>
      <VacancyCard vacancy={vacancy} showDescription={true} />
    </Container>
  );
}
