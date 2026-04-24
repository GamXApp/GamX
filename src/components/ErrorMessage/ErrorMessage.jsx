import styles from './ErrorMessage.module.css';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.error}>
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Reintentar</button>}
    </div>
  );
}

export default ErrorMessage;