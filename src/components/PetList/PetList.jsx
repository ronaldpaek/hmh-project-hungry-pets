import PropTypes from "prop-types";

import { PetCard } from "../";
import styles from "./styles.module.css";

const PetList = ({ pets }) => {
  return (
    <ul className={styles.list}>
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </ul>
  );
};

PetList.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      emoji: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      hunger: PropTypes.number.isRequired,
      love: PropTypes.number.isRequired,
      eulogy: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default PetList;
