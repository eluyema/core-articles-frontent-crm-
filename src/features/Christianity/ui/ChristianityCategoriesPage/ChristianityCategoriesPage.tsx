import { Box, Button, Card, Group, Stack, TextInput, Title } from "@mantine/core";
import { useChristianityCategoriesPage } from "./useChristianityCategoriesPage";
import styles from "./index.module.scss";
import loadingImage from "../../../../assets/loading-cat.gif";

export const ChristianityCategoriesPage = () => {
    const {
        categories,
        updateCategoryCode,
        updateSubcategoryCode,
        deleteCategory,
        deleteSubcategory,
        addCategory,
        addSubcategory,
        saveLoading,
        loadLoading,
        saveCategories
    } = useChristianityCategoriesPage();

    return (
        <Box className={styles.container}>
            <Title order={2} mb="md">Категорії та підтеми</Title>

            {loadLoading && <img src={loadingImage} alt="Loading..." width={400}/>}

            <Stack align="start">
                {!loadLoading && categories.map((category) => (
                    <Card className={styles.categoryBlock} key={category.tempId} shadow="sm" padding="lg" radius="md" withBorder>
                        <Stack>
                            <Group grow className={styles.categoryInputBlock}>
                                <TextInput
                                    label="ID Категорії з БД"
                                    value={category.dbId ?? "Відсутний"}
                                    disabled
                                    className={styles.idInput}
                                />
                                <TextInput
                                    label="Категорія"
                                    value={category.code}
                                    disabled={saveLoading}
                                    onChange={(e) => updateCategoryCode(category.tempId, e.target.value)}
                                    placeholder="Введіть код категорії (буде використовуватись в URL)"
                                />
                                <Button disabled={saveLoading} color="red" className={styles.deleteButton} variant="outline" onClick={() => deleteCategory(category.tempId)}>
                                    Видалити категорію
                                </Button>
                            </Group>

                            <Stack ml="md">
                                <Title order={6}>Підтеми:</Title>
                                {category.subcategories.map((sub) => (
                                    <Group key={sub.tempId} grow align="flex-end" >
                                        <TextInput
                                            label="ID Підтеми з БД"
                                            value={sub.dbId ?? "Відсутний"}
                                            disabled
                                            className={styles.idInput}
                                        />
                                        <TextInput
                                            value={sub.code}
                                            disabled={saveLoading}
                                            onChange={(e) =>
                                                updateSubcategoryCode(category.tempId, sub.tempId, e.target.value)
                                            }
                                            placeholder="Введіть код підтемі (буде використовуватись в URL)"
                                        />
                                        <Button
                                            color="red"
                                            variant="light"
                                            className={styles.deleteButton}
                                            disabled={saveLoading}
                                            onClick={() => deleteSubcategory(category.tempId, sub.tempId)}
                                        >
                                            Видалити
                                        </Button>
                                    </Group>
                                ))}

                                <Button
                                    variant="light"
                                    disabled={saveLoading}
                                    className={styles.addButton}
                                    onClick={() => addSubcategory(category.tempId)}
                                    mt="sm"
                                >
                                    Додати підкатегорію
                                </Button>
                            </Stack>
                        </Stack>
                    </Card>
                ))}

                <Button disabled={saveLoading} onClick={addCategory} mt="md">
                    Додати категорію
                </Button>
            </Stack>
            <Button size="lg" disabled={saveLoading || loadLoading} color="green" className={styles.saveButton} onClick={saveCategories}>Зберегти</Button>
        </Box>
    );
};

export default ChristianityCategoriesPage;
