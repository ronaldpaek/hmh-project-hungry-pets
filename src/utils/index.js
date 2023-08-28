import { petEmojis, petNames, petEulogies } from "../constants";

const generatePet = () => {
  const randomNameIndex = Math.floor(Math.random() * petNames.length);
  const id = Math.floor(Math.random() * 1000000);
  const emoji = petEmojis[Math.floor(Math.random() * petEmojis.length)];
  const name = petNames[randomNameIndex];
  const hunger = 0;
  const love = 100;
  const eulogy = petEulogies[randomNameIndex];
  const isAlive = true;

  return {
    id,
    emoji,
    name,
    hunger,
    love,
    eulogy,
    isAlive,
  };
};

export { generatePet };
