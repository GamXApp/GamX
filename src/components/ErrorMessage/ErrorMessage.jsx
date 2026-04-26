import styles from './ErrorMessage.module.css';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.error}>
      <p>No se pudo cargar los datos</p>
      {onRetry && <button onClick={onRetry}>Reintentar</button>}
    </div>
  );
}

export default ErrorMessage;