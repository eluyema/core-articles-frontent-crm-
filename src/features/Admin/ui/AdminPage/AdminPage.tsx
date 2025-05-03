import { Container, Text, Title } from '@mantine/core';
import styles from './index.module.scss';

const AdminPage = () => {
    return (
        <Container className={styles.container}>
            <Title order={2} className={styles.title}>
                Панель адміністратора
            </Title>
            <Text className={styles.paragraph}>
                Ласкаво просимо на головну сторінку адміністратора. Тут ви можете керувати контентом для всіх вебсайтів, до яких маєте доступ.
            </Text>
            <Text className={styles.paragraph}>
                Використовуйте меню навігації зліва, щоб перейти до різних розділів. Наприклад, у секції «Вебсайти» є посилання на керування контентом для сайту <strong>християнства</strong>.
            </Text>
            <Text className={styles.note}>
                Більше розділів з’явиться, коли ваші права доступу буде розширено або буде додано нові сайти.
            </Text>
        </Container>
    );
};

export default AdminPage;
