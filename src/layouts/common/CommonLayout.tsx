import styles from './commonLayout.module.scss'

type CommonLayoutProps = {}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  )
}

export default CommonLayout
