import { useNavigate, useParams } from "react-router-dom";
import type { Vacancy } from "../types/types";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ky from "ky";
import { Spinner } from "../components/Spinner";

export function DescriptionVacancy() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
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
      <Stack
        gap="xs"
        key={vacancy.id}
        style={{
          border: "1px solid #dee2e6",
          borderRadius: "12px",
          backgroundColor: "white",
          minHeight: "250px !important",
          width: "660px",
          padding: "24px",
          margin: "0 auto",
        }}
      >
        <Title order={5}>{vacancy.name}</Title>

        <Group>
          <Text>
            {vacancy.salary ? (
              <>
                {vacancy.salary.from} - {vacancy.salary.to}{" "}
                {vacancy.salary.currency}
              </>
            ) : (
              "з/п не указана"
            )}
          </Text>
          <Text>Опыт: {vacancy.experience.name}</Text>
        </Group>

        <Text size="xs" style={{ color: "lightgray" }}>
          {vacancy.employer.name}
        </Text>

        <Text size="xs">
          {vacancy.work_format.map((format) => {
            if (format.id === "REMOTE")
              return (
                <Badge
                  size="xs"
                  radius="xs"
                  style={{ marginLeft: "2px", marginRight: "2px" }}
                >
                  {format.name}
                </Badge>
              );
            if (format.id === "HYBRID")
              return (
                <Badge
                  color="black"
                  size="xs"
                  radius="xs"
                  style={{ marginLeft: "2px", marginRight: "2px" }}
                >
                  {format.name}
                </Badge>
              );
            if (format.id === "ON_SITE")
              return (
                <Badge
                  color="gray"
                  size="xs"
                  radius="xs"
                  style={{ marginLeft: "2px", marginRight: "2px" }}
                >
                  {format.name}
                </Badge>
              );
          })}
        </Text>

        <Text h={20}>{vacancy.area.name}</Text>

        <Group gap="xs">
          <a type="button" href="https://hh.ru/">
            <Button
              variant="filled"
              size="xs"
              styles={{
                root: {
                  backgroundColor: "lightgrey",
                },
              }}
            >
              <span style={{ color: "black" }}>Откликнуться на hh.ru</span>
            </Button>
          </a>
        </Group>
      </Stack>

      <Stack
        gap="xs"
        key={vacancy.id}
        style={{
          border: "1px solid #dee2e6",
          borderRadius: "12px",
          backgroundColor: "white",
          minHeight: "250px !important",
          width: "660px",
          padding: "24px",
          margin: "24px auto",
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: vacancy.description || "",
          }}
        />
      </Stack>
    </Container>
  );
}
