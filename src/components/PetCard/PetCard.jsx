import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const PetCard = ({ pet, onPetDeath }) => {
  const [hunger, setHunger] = useState(pet.hunger);
  const [love, setLove] = useState(pet.love);
  const [isPetAlive, setIsPetAlive] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const cardClass = showAnimation
    ? `${styles.card} ${styles.cardWithAnimation}`
    : styles.card;

  useEffect(() => {
    const interval = setInterval(() => {
      if (hunger >= 100 || love <= 0) {
        clearInterval(interval);
        setIsPetAlive(false);
        onPetDeath(pet.id);
        return;
      }

      setHunger((prevHunger) => prevHunger + 2);
      setLove((prevLove) => prevLove - 2);
    }, 1000);
    return () => clearTimeout(interval);
  }, [hunger, love, onPetDeath, pet.id]);

  useEffect(() => {
    if (!isPetAlive) {
      setShowAnimation(true);
    }
  }, [isPetAlive]);

  const handleFeedClick = () => {
    setHunger(0);
  };

  const handleEmojiClick = () => {
    setLove(100);
  };

  return (
    <li key={pet.id} className={cardClass}>
      <div className={styles.cardContent}>
        <button
          className={styles.emojiButton}
          onClick={handleEmojiClick}
          aria-label="Recharge love"
        >
          {pet.emoji}
        </button>
        <p className={styles.name}>{pet.name}</p>
        {isPetAlive && (
          <>
            <div className={styles.hungerLabelGroup}>
              <label className={styles.hungerLabel}>Hunger:</label>
              <meter
                className={styles.hungerMeter}
                value={hunger}
                min="0"
                max="100"
              />
            </div>
            <div className={styles.loveLabelGroup}>
              <label className={styles.loveLabel}>Love:</label>
              <meter
                className={styles.loveMeter}
                value={love}
                min="0"
                max="100"
              />
            </div>
            <button className={styles.feedButton} onClick={handleFeedClick}>
              Feed me 🍞
            </button>
          </>
        )}
        {!isPetAlive && <q>{pet.eulogy}</q>}
      </div>
    </li>
  );
};

PetCard.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    emoji: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hunger: PropTypes.number.isRequired,
    love: PropTypes.number.isRequired,
    eulogy: PropTypes.string.isRequired,
    isAlive: PropTypes.bool.isRequired,
  }).isRequired,
  onPetDeath: PropTypes.func.isRequired,
};

export default PetCard;
