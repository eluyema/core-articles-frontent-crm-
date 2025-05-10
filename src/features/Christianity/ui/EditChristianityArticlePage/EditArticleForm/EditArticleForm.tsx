import {Button, Group, Select, Stack, Switch, TextInput, Tooltip} from "@mantine/core";
import {ChristianityArticle} from "../../../modal/entities/ChristianityArticle.ts";
import {ChristianityCategory} from "../../../modal/entities/ChristianityCategory.ts";
import useEditArticleForm from "./useEditArticleForm.ts";
import { IconCheck, IconX } from "@tabler/icons-react";
import styles from './index.module.scss';

type EditArticleForm = {
    article: ChristianityArticle;
    categories: ChristianityCategory[];
    updateArticle: (params: { slug: string; category: string; subcategory: string; active: boolean; } ) => void;
};

const EditArticleForm = (props: EditArticleForm) => {
    const {form, categoryOptions, subcategoryOptions} = useEditArticleForm(props);
    const handleSubmit = form.onSubmit((values) => {
        props.updateArticle(values);
    });

    return (
        <form onSubmit={handleSubmit}>
            <Stack align="start"  mt="lg">
                <Tooltip label="Активні статті відображаються на сайті, неактивні — ні" refProp="rootRef" position="top-start">
                    <Switch
                        checked={form.values.active}
                        onChange={(event) => form.setFieldValue("active", event.currentTarget.checked)}
                        color="teal"
                        label="Активна"
                        labelPosition="left"
                        size="md"
                        thumbIcon={
                            form.values.active ?  (
                                <IconCheck size={12} color="var(--mantine-color-teal-6)" stroke={3} />
                            ) : (
                                <IconX size={12} color="var(--mantine-color-red-6)" stroke={3} />
                            )
                        }
                    />
                </Tooltip>
                <TextInput
                    className={styles.input}
                    label="Slug"
                    placeholder="Введіть унікальний slug"
                    {...form.getInputProps("slug")}
                    error={form.errors.slug ?? ""}
                />
                <Select
                    className={styles.input}
                    label="Категрія"
                    placeholder="Оберіть категорію"
                    clearable
                    data={categoryOptions}
                    value={form.values.category === "" ? null : form.values.category}
                    onChange={(value) => form.setFieldValue("category", value || "")}
                    error={form.errors.category ?? ""}

                />
                <Select
                    className={styles.input}
                    label="Підтема"
                    placeholder="Оберіть підтему"
                    data={subcategoryOptions}
                    clearable
                    disabled={!form.values.category}
                    value={form.values.subcategory === "" ? null : form.values.subcategory}
                    error={form.errors.subcategory ?? ""}
                    onChange={(value) => form.setFieldValue("subcategory", value || "")}
                />
            </Stack>
            <Group mt="lg" justify="flex-start">
                <Button type="submit" size="md">Зберегти</Button>
            </Group>
        </form>
    )
};

export default EditArticleForm;