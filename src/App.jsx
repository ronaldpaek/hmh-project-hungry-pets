import { useState, useEffect } from "react";

import { PetList } from "./components";
import { generatePet } from "./utils";

const App = () => {
  const [pets, setPets] = useState([generatePet()]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPet = generatePet();
      setPets((prevPets) => [...prevPets, newPet]);
    }, 10000);

    return () => clearTimeout(interval);
  }, []);

  return (
    <main className="container">
      <h1>Hungry Pets</h1>
      <PetList pets={pets} />
    </main>
  );
};

export default App;
