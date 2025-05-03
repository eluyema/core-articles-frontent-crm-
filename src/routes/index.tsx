import { createFileRoute } from '@tanstack/react-router'
import {Button} from "@mantine/core";
import { Link } from '@tanstack/react-router'
import gear_v2 from '../assets/gears/gear_v2.gif';
import coolDancing from '../assets/coolDancing.gif';
import jesusWithSheep from '../assets/jesus_with_sheep.gif';
import woooo from '../assets/woooo.gif';

import styles from './index.module.scss';
import {useAuth} from "../features/Auth/model/hooks/useAuth.ts";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {userDetails} = useAuth();

  const authinticated = !!userDetails;

  return <main className={styles.main}>
    <h1 className={styles.title}>Привет!</h1>
    {!authinticated && <p>Для работы с админкой тебе нужно войти в систему</p>}
    {authinticated ? <Button component={Link} to="/admin">Перейти в админку</Button> : <Button component={Link} to="/login">Логин</Button>}
    <img src={jesusWithSheep} width={300} className={styles.topLeft} alt="Jesus"/>
    <img src={gear_v2} width={200} className={styles.topRight} alt="Cool animated gear"/>
    <img src={coolDancing} width={200} className={styles.bottomLeft} alt="Cool dancing"/>
    <img src={woooo} width={200} className={styles.bottomRight} alt="woooor"/>

  </main>
}
