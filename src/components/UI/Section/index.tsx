import styles from './styles.module.css';

type TProps = {
  children: JSX.Element;
};

const Section = ({ children }: TProps) => {
  return <section className={styles.section}>{children}</section>;
};

export default Section;
