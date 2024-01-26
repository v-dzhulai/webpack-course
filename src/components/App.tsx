import React from 'react'
import styles from './App.module.scss'
import { Link, Outlet } from 'react-router-dom';
import iconPng from "@/assets/icon.png";
import iconJpg from "@/assets/icon.jpg";
import Setting from "@/assets/icon.svg";

export default function App() {
    const [count, setCount] = React.useState(0);

    function TODO1() {
        throw new Error();
    }

    function TODO2() {
        TODO1();
    }

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        // setCount(count - 1);
        TODO2();
    }

    // if(__PLATFORM__ === 'desktop') return <h1>THIS IS DESKTOP PLATFORM</h1>
    // if(__PLATFORM__ === 'mobile')  return <h1>THIS IS MOBILE PLATFORM</h1>

    return (
    <div data-testid={'App'}>
        <h1 data-testid={'Platform'}>Platform - {__PLATFORM__}</h1>

        <Link to={'/about'}>About</Link>
        <br/>
        <Link to={'/shop'}>Shop</Link>

        <h1 className={styles.value}>{count}</h1>
        <button className={styles.button} onClick={increment}>Increment</button>
        <button className={styles.button} onClick={decrement}>Decrement</button>

        <div><img width={100} height={100} src={iconJpg} alt="" /></div>
        <div><img width={100} height={100} src={iconPng} alt="" /></div>
        <div>
            <Setting className={styles.icon} color={'green'}  />
        </div>

        <Outlet />
    </div>
    )
}
