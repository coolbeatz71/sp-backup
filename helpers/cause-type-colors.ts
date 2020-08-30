const colors: { [key: string]: string } = {
  total: "rgb(136, 134, 214)",
  completed: "rgb(23, 139, 251)",
  ongoing: "rgb(253, 128, 75)",
  active: "rgb(253, 128, 75)",
  pending: "rgb(254, 186, 60)",
  paused: "rgb(31, 195, 160)",
  cancelled: "rgb(181, 143, 126)",
};

export const unwrap = (key: string) => {
  return colors[key]?.replace("rgb(", "").replace(")", "");
};

export default colors;
