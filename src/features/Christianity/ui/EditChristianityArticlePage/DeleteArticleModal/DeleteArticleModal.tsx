import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Title, Text, Stack } from '@mantine/core';

type DeleteArticleModalProps = {
    handleDelete: () => void;
};

const DeleteArticleModal = ({ handleDelete }: DeleteArticleModalProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    const onDelete = () => {
        handleDelete();
        close();
    };

    return (
        <>
            <Modal
                size="md"
                opened={opened}
                onClose={close}
                title={<Title order={3}>Підтвердження видалення</Title>}
                centered
            >
                <Stack>
                    <Text size="md" color="dimmed">
                        Ви впевнені, що хочете видалити статтю? Точно?? Цю дію не можна буде скасувати.
                    </Text>

                    <Group justify="center" mt="md">
                        <Button onClick={onDelete} color="red" size="md">
                            Так, видалити
                        </Button>
                        <Button onClick={close} variant="outline" size="md">
                            Скасувати
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            <Button color="red" onClick={open}>
                Видалити статтю
            </Button>
        </>
    );
};

export default DeleteArticleModal;
