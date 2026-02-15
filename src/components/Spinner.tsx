import { Loader } from "@mantine/core";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loader size="xl" />
    </div>
  );
};

export { Spinner };
