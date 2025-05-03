import { useLoginPage } from "./useLoginPage.ts";
import { Button, Paper, TextInput, PasswordInput, Title } from "@mantine/core";

import styles from "./index.module.scss";

const LoginPage = () => {
    const {
        username,
        password,
        loading,
        onChangePassword,
        onChangeUsername,
        onSubmit,
    } = useLoginPage();

    return (
        <div className={styles.container}>
            <Paper className={styles.formContainer} shadow="md" p="lg" radius="md" withBorder>
                <Title order={3} className={styles.title}>
                    Login
                </Title>
                <form onSubmit={onSubmit} className={styles.form}>
                    <TextInput
                        label="Username"
                        value={username}
                        onChange={onChangeUsername}
                        withAsterisk
                        required
                        mt="sm"
                    />
                    <PasswordInput
                        label="Password"
                        value={password}
                        onChange={onChangePassword}
                        withAsterisk
                        required
                        mt="sm"
                    />
                    <Button
                        disabled={loading}
                        type="submit"
                        fullWidth
                        mt="md"
                        className={styles.button}
                    >
                        Вход
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default LoginPage;
