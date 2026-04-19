import { useState } from 'react';
import styles from './WishlistModal.module.css';

function WishlistModal({ game, onConfirm, onClose }) {
  const [formData, setFormData] = useState({
    notes: '',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Agregar a Deseos</h2>
        <p>{game.title}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Notas:
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </label>
          <label>
            Prioridad:
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </label>
          <div className={styles.actions}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WishlistModal;