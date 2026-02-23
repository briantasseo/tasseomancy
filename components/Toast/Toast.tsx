import styles from './Toast.module.css'

interface ToastProps {
  message: string
  show: boolean
}

export default function Toast({ message, show }: ToastProps) {
  return (
    <div className={`${styles.toast} ${show ? styles.show : ''}`} role="alert">
      {message}
    </div>
  )
}
