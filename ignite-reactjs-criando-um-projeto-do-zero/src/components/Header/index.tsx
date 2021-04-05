import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.logo}>
      <img src="/logo.png" alt="logo" />
      <img src="/spacetraveling.png" alt="spacetraveling" />
      <div />
    </header>
  );
}
