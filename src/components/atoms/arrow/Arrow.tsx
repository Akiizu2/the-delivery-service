import styles from './arrow.module.scss'
import classnames from 'classnames'
type ArrowProps = {
  disabled?: boolean
}

const Arrow: React.FC<ArrowProps> = ({ disabled }) => {
  return (
    <span
      className={classnames(styles.arrow, {
        [styles.disabled]: disabled,
      })}
    >
      →
    </span>
  )
}

export default Arrow
