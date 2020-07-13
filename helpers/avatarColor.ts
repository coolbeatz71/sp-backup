import randmonColor from "randomcolor";

const getAvatarBgColor = (avatar: any) => {
  let newColor: string;
  const color = localStorage.getItem("avatar-bg");
  if (avatar) {
    localStorage.removeItem("avatar-bg");
  }

  if (!color && !avatar) {
    newColor = randmonColor();
    localStorage.setItem("avatar-bg", newColor);
    return newColor;
  }

  return color ? color : undefined;
};

export default getAvatarBgColor;
