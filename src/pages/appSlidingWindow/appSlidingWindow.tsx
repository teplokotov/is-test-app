import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './appSlidingWindow.module.css';
import { urls } from '../../utils/constants';
import { TUser } from '../../services/types';
import Row from '../../components/row/row';

function AppSlidingWindow() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<TUser>({} as TUser);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [start, setStart] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { height } = useWindowDimensions();
  const rowHeight = 20;
  const visibleRows = height ? Math.round(height / rowHeight) : 0;

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

  useEffect(() => {
    function onScroll(e: Event) {
      const target = e.target as HTMLDivElement;
      setStart(Math.min(
        users.length - visibleRows - 1,
        Math.floor(target.scrollTop / rowHeight)
      ));
    }
    wrapperRef.current?.addEventListener('scroll', onScroll);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      wrapperRef.current?.removeEventListener('scroll', onScroll);
    }
  }, [users.length, visibleRows, rowHeight]);

  const getTrueIndex = useCallback((user: TUser) => {
    return users.indexOf(user)
  }, [users]);

  function getTopHeight(): number {
    return rowHeight * start;
  }
  function getBottomHeight(): number {
    return rowHeight * (users.length - (start + visibleRows + 1));
  }

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
        (<div className={styles.wrapper} ref={wrapperRef}>
          <ul className={styles.list} style={{paddingTop: getTopHeight(), paddingBottom: getBottomHeight()}}>
            {users.slice(start, start + visibleRows + 1).map((user) => (
              <li key={user.id} onClick={() => handleOnClick(user, getTrueIndex(user))}>
                <Row item={user}
                     index={getTrueIndex(user)}
                />
              </li>
            ))}
          </ul>
        </div>)
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

export default AppSlidingWindow;

