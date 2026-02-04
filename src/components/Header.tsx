import { Group, Text } from "@mantine/core";
import { Image } from "@mantine/core";
import HHImage from "../../public/HHImage.svg";
import Point from "../../public/Point.svg";

export function Header() {
  return (
    <header
      style={{
        alignItems: "center",
        height: "60px",
        backgroundColor: "white",
        padding: "10px",
      }}
    >
      <Group
        justify="space-between"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        <Group>
          <Image h={30} w={30} src={HHImage} />
          <Text size="xl" fw={500} style={{ color: "#000000" }}>
            .FrontEnd
          </Text>
        </Group>

        <Group>
          <Text
            style={{
              color: "#5E96FC",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Вакансии FE
          </Text>
          <Image h={6} w={6} src={Point} />
        </Group>
        <Group></Group>
      </Group>
    </header>
  );
}
