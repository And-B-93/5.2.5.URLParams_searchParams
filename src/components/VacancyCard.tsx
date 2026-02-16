import { Badge, Button, Group, Stack, Text, Title } from "@mantine/core";
import type { Vacancy } from "../types/types";
import { Link } from "react-router-dom";

interface VacancyCardProps {
  vacancy: Vacancy;
  showDescription?: boolean;
  showButtonSeeVacancy?: boolean;
}

const VacancyCard = ({
  vacancy,
  showDescription = false,
  showButtonSeeVacancy = true,
}: VacancyCardProps) => {
  return (
    <>
      {" "}
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
          {showButtonSeeVacancy && (
            <Link to={`/vacancies/${vacancy.id}`}>
              <Button color="black" size="xs" variant="filled">
                Смотреть вакансию
              </Button>
            </Link>
          )}

          <Link to="https://hh.ru/">
            <Button
              variant="filled"
              size="xs"
              styles={{
                root: {
                  backgroundColor: "lightgrey",
                },
              }}
            >
              <span style={{ color: "black" }}>Откликнуться</span>
            </Button>
          </Link>
        </Group>
      </Stack>
      {showDescription && (
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
      )}
    </>
  );
};

export { VacancyCard };
