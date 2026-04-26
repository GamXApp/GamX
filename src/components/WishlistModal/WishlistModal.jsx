import { useState } from 'react'
import styles from './WishlistModal.module.css'

export default function WishlistModal({ game, onConfirm, onClose }) {
  const [formData, setFormData] = useState({ notes: '', priority: 'medium' })

  function handleSubmit(e) {
    e.preventDefault()
    onConfirm(formData)
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Agregar a deseos">

        <div className={styles.header}>
          <h2 className={styles.title}>Agregar a Deseos</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <div className={styles.gameRow}>
          <img src={game.thumbnail} alt={game.title} className={styles.gameThumb} />
          <div>
            <p className={styles.gameName}>{game.title}</p>
            <p className={styles.gameGenre}>{game.genre}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.fieldLabel}>
            Notas
            <textarea
              className={styles.textarea}
              placeholder="¿Por qué querés jugar esto?"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </label>

          <label className={styles.fieldLabel}>
            Prioridad
            <div className={styles.priorityRow}>
              {['low', 'medium', 'high'].map(p => {
                const labels = { low: 'Baja', medium: 'Media', high: 'Alta' }
                return (
                  <button
                    key={p}
                    type="button"
                    className={`${styles.priorityBtn} ${formData.priority === p ? styles.priorityBtnActive : ''}`}
                    onClick={() => setFormData({ ...formData, priority: p })}
                  >
                    {labels[p]}
                  </button>
                )
              })}
            </div>
          </label>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
            <button type="submit" className={styles.confirmBtn}>Agregar ♡</button>
          </div>
        </form>
      </div>
    </div>
  )
}
