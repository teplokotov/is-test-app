import { TUser } from '../../services/types';
import styles from './row.module.css';

function Row (item: TUser, index: number) {
  return (
    <p key={item.id} className={styles.row} >
      {`${index}. 👤 ${item.username} ${item.lastname}`}
    </p>
  );
};

export default Row;
