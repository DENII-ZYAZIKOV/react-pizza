import React from "react";
import styles from "../NotFoundBlock/NotFoundBlock.module.scss";
export default function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Корзина пустая
      </h1>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать
        пиццу, перейди на главную страницу.
      </p>
    </div>
  );
}
