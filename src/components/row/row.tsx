import { TUser } from '../../services/types';
import styles from './row.module.css';

type Props = {
  item: TUser,
  index: number
}

function Row ({ item, index }: Props) {
  return (
    <p key={item.id} className={styles.row} >
      {`${index}. 👤 ${item.username} ${item.lastname}`}
    </p>
  );
};

export default Row;
