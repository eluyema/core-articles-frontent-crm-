import useArticleTranslationMetaForm from './useArticleTranslationMetaForm.ts';
import styles from './index.module.scss';
import {
    Box,
    Button,
    FileInput,
    Group,
    Text,
    TextInput,
    Image,
    Textarea, Combobox
} from "@mantine/core";
import { IconPhoto} from "@tabler/icons-react";
import CountryFlag from "../../../../../shared/ui/CountryFlag";
import ClearButton = Combobox.ClearButton;

type ArticleMetaFormProps = {
    handleSubmitMetaForm: () => void;
}

const ArticleTranslationMetaForm = ({handleSubmitMetaForm}: ArticleMetaFormProps) => {

    const { lang, form, loading, onSubmit } = useArticleTranslationMetaForm(handleSubmitMetaForm);

    return <form onSubmit={onSubmit}>
        <Box mt="lg">
            <Text>
                Мова перекладу: <CountryFlag language={lang}/>
            </Text>
            <Textarea
                className={styles.bigInput}
                mt="md"
                autosize
                disabled={loading}
                minRows={2}
                label="Назва"
                placeholder="Введіть назву статті"
                {...form.getInputProps("title")}
                error={form.errors.title ?? ""}
            />
            <Textarea
                className={styles.bigInput}
                mt="md"
                autosize
                minRows={4}
                disabled={loading}
                label="Опис статті"
                description="Маж бути закликаючий опис, який буде відображатись в мета тегаг для пошукового робота Google, користувач не буде бачити його на сайті"
                placeholder="Введіть опис статті"
                {...form.getInputProps("description")}
                error={form.errors.description ?? ""}
            />
            <FileInput
                leftSection={<IconPhoto />}
                className={styles.input}
                mt="lg"
                disabled={loading}
                label="Додайте зображення для прев'ю статті"
                placeholder="Зображення прев'ю статті"
                leftSectionPointerEvents="none"
                value={form.values.previewImage}
                error={form.errors.previewImage ?? ''}
                onChange={(value) => form.setFieldValue('previewImage', value)}
                accept="image/jpeg,image/png,image/webp"
            />
            {form.values.previewImage && (
                <Box className={styles.previewImageBackground} p="sm" bg="gray.3" mt="sm" mb="sm">
                    <Image
                        className={styles.previewImage}
                        src={URL.createObjectURL(form.values.previewImage)}
                        alt="Прев'ю зображення"
                        radius="md"
                        h={350}
                        fit="contain"
                    />
                    <ClearButton className={styles.clearPreviewImageButton} onClear={()=>form.setFieldValue("previewImage", null)}/>
                </Box>
            )}
            <Text size="sm" c="dimmed" mt="xs">
                Рекомендовано використовувати JPG, PNG або WEBP до 2MB.
                Для зменшення розміру без втрати якості скористайтесь{" "}
                <Text component="a" href="https://tinypng.com" target="_blank" c="blue.6" span>
                    TinyPNG
                </Text>
                .
            </Text>
            <TextInput
                className={styles.input}
                mt="md"
                disabled={loading}
                label="Підпис до зображення"
                description="Коротко опишіть зображення (буде відображатись в разі якщо зображення не буде з якихось причин не загружено)"
                placeholder="Введіть назву статті"
                {...form.getInputProps("previewImageAlt")}
                error={form.errors.previewImageAlt ?? ""}
            />
        </Box>
        <Group mt="lg" justify="flex-start">
            <Button type="submit" size="md">Перейти до редагування контента статті</Button>
        </Group>
    </form>
};

export default ArticleTranslationMetaForm;