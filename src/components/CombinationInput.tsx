// GlobalCombinationButtons.tsx
import React from "react";
import styles from "./CombinationInput.module.css"; // Assuming the styles are in a separate CSS module

/**
 * Component to render the global combination buttons for navigating combinations.
 *
 * @param {Object} props - The component's props.
 * @param {Function} props.onLeftClick - Function to call when the left button is clicked.
 * @param {Function} props.onRightClick - Function to call when the right button is clicked.
 *
 * @returns {JSX.Element} The JSX representation of the global combination buttons.
 */
const GlobalCombinationButtons: React.FC<{
    onLeftClick: () => void;
    onRightClick: () => void;
}> = ({ onLeftClick, onRightClick }) => {
    return (
        <div className={styles["global-combination-buttons"]}>
            <input type="button" value="<" onClick={onLeftClick} />
            Combination
            <input type="button" value=">" onClick={onRightClick} />
        </div>
    );
};

export default GlobalCombinationButtons;
