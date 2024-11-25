import React from "react";
import styles from "./TitleBar.module.css";

/**
 * TitleBar component renders the title bar of the application.
 * It displays the application name "Courser" with a subtext indicating
 * that it is in a very pre-release state.
 *
 * @returns {JSX.Element} The rendered title bar component.
 */
const TitleBar = () => {
    return (
        <div className={styles["title-bar"]}>
            Courser (<i>Very Pre-</i>Release)
        </div>
    );
};

export default TitleBar;
