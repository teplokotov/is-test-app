import { FormEvent, useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import styles from './appVirtuoso.module.css';
import { urls } from '../../utils/constants';
import { TUser } from '../../services/types';
import Row from '../../components/row/row';

function AppVirtuoso() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<TUser>({} as TUser);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const requests = urls.map((item) => fetch(item));

    Promise
      .all(requests)
      .then(responses => responses)
      .then(responses => Promise.all(responses.map((item) => item.json())))
      .then(users => {
        setUsers(users.flat() as TUser[]);
        setIsLoading(false);
      })
      .catch(err => console.log(err));

  }, []);

  function handleOnClick(item: TUser, index: number) {
    setUser(item);
    setCurrentIndex(index);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setUsers([...users.slice(0, currentIndex), user, ...users.slice(currentIndex + 1)]);
  }

  return (
    <main className={styles.main}>
    {isLoading && <p className={styles.loading}>⌛ Loading...</p>}
    {
      users.length > 0 &&
      (<ul className={styles.list}>
        <Virtuoso
          data={users}
          itemContent={(index, user) => (
            <li key={user.id} onClick={() => handleOnClick(user, index)}>
              <Row item={user} index={index} />
            </li>
          )}
        />
      </ul>)
    }
    {
      Object.keys(user).length !== 0 &&
        (<form className={styles.form} onSubmit={onSubmit}>
          <h1 className={styles.title}>👤 ID: {user.id}</h1>
          <input name="id" defaultValue={user.id} hidden/>
          <div className={styles.fields}>
            <p className={styles.row}>
              <label className={styles.label} htmlFor="username">Name</label>
              <input className={styles.input}
                     name="username"
                     id="username"
                     value={user.username}
                     onChange={(e) => setUser({...user, username: e.target.value})}
              />
            </p>
            <p className={styles.row}>
              <label className={styles.label} htmlFor="lastname">Surname</label>
              <input className={styles.input}
                     name="lastname"
                     value={user.lastname}
                     onChange={(e) => setUser({...user, lastname: e.target.value})}
              />
            </p>
            <p className={styles.row}>
              <label className={styles.label} htmlFor="age">Age</label>
              <input className={styles.input}
                     name="age"
                     value={user.age}
                     onChange={(e) => setUser({...user, age: Number(e.target.value)})}
                     type='number'
              />
            </p>
            <p className={styles.row}>
              <label className={styles.label} htmlFor="lastname">Email</label>
              <input className={styles.input}
                      name="email"
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value})}
              />
            </p>
            <button className={styles.button} type="submit">💾 Save</button>
          </div>
        </form>)
    }
    </main>
  )
}

export default AppVirtuoso;
