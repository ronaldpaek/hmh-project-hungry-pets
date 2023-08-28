import { useState, useEffect, useRef } from "react";

import { PetList } from "./components";
import { generatePet } from "./utils";

const App = () => {
  const [pets, setPets] = useState([generatePet()]);
  const petsRef = useRef(pets);

  useEffect(() => {
    petsRef.current = pets;
  }, [pets]);

  useEffect(() => {
    const interval = setInterval(() => {
      const allPetsAlive = petsRef.current.every((pet) => pet.isAlive);

      if (allPetsAlive) {
        const newPet = generatePet();
        setPets((prevPets) => [...prevPets, newPet]);
      }
    }, 10000);
    return () => clearTimeout(interval);
  }, []);

  const handlePetDeath = (petId) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === petId ? { ...pet, isAlive: false } : pet,
      ),
    );
  };

  return (
    <main className="container">
      <h1>Hungry Pets</h1>
      <PetList pets={pets} onPetDeath={handlePetDeath} />
    </main>
  );
};

export default App;
