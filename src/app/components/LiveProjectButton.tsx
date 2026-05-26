'use client'

import Magnet from './Magnet'
import styles from './LiveProjectButton.module.css'

interface LiveProjectButtonProps {
  label?: string
  href?: string
  className?: string
}

const LiveProjectButton = ({
  label = 'Live Project',
  href = '#',
  className = '',
}: LiveProjectButtonProps) => {
  return (
    <Magnet strength={3} padding={45}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${className}`}
      >
        {label}
      </a>
    </Magnet>
  )
}

export default LiveProjectButton
