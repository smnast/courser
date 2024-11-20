import React from "react";
import styles from "./TitleBar.module.css";

const TitleBar = () => {
    return (
        <div className={styles["title-bar"]}>
            Courser (<i>Very Pre-</i>Release)
        </div>
    );
};

export default TitleBar;
