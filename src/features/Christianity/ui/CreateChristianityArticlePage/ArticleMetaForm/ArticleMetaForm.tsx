import useArticleMetaForm from './useArticleMetaForm.ts';
import styles from './index.module.scss';
import {
    Box,
    Button,
    Divider, FileInput,
    Group,
    Select,
    Text,
    SelectProps,
    Switch,
    TextInput,
    Image,
    Title,
    Tooltip
} from "@mantine/core";
import {IconCheck, IconPhoto, IconX} from "@tabler/icons-react";
import CountryFlag from "../../../../../shared/ui/CountryFlag";
import {useEffect, useState} from "react";

const renderLanguageSelectOption: SelectProps['renderOption'] = ({ option }) => (
    <Group flex="1" gap="xs">
        <CountryFlag language={option.value} />
        {option.label}
    </Group>
);

const languages = [
    { value: "en", label: "Англійська" },
    { value: "ua", label: "Українська" },
    { value: "ru", label: "Російська" },
    { value: "fr", label: "Французька" },
    { value: "de", label: "Німецька" },
    { value: "pt", label: "Португальська" },
    { value: "es", label: "Іспанська" }
];

type ArticleMetaFormProps = {
    handleSubmitMetaForm: () => void;
}

const ArticleMetaForm = ({handleSubmitMetaForm}: ArticleMetaFormProps) => {

    const { form, categoryOptions, subcategoryOptions, onSubmit } = useArticleMetaForm(handleSubmitMetaForm);

    const [blurPreview, setBlurPreview] = useState<string | null>(null);

    useEffect(() => {
        const loadBlurPreview  = async (preview: File | null)=>{
            if(!form.values.previewImage) {
                return;
            }
            if (preview) {
                const blur = await generateBlurDataUrl(preview);
                setBlurPreview(blur);
            } else {
                setBlurPreview(null);
            }
        };
        loadBlurPreview(form.values.previewImage);
    }, [form.values.previewImage])

    return <form onSubmit={onSubmit}>
        <Box mt="lg">
            <Tooltip label="Активні статті відображаються на сайті, неактивні — ні" refProp="rootRef"
                     position="top-start">
                <Switch
                    checked={form.values.active}
                    onChange={(event) => form.setFieldValue("active", event.currentTarget.checked)}
                    color="teal"
                    label="Активна"
                    labelPosition="left"
                    size="md"
                    thumbIcon={
                        form.values.active ? (
                            <IconCheck size={12} color="var(--mantine-color-teal-6)" stroke={3}/>
                        ) : (
                            <IconX size={12} color="var(--mantine-color-red-6)" stroke={3}/>
                        )
                    }
                />
            </Tooltip>
            <TextInput
                className={styles.input}
                mt="md"
                label="Slug"
                placeholder="Введіть унікальний slug"
                {...form.getInputProps("slug")}
                error={form.errors.slug ?? ""}
            />
            <Select
                className={styles.input}
                mt="lg"
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
                mt="lg"
                label="Підтема"
                placeholder="Оберіть підтему"
                data={subcategoryOptions}
                clearable
                disabled={!form.values.category}
                value={form.values.subcategory === "" ? null : form.values.subcategory}
                error={form.errors.subcategory ?? ""}
                onChange={(value) => form.setFieldValue("subcategory", value || "")}
            />
            <Divider mt="lg" mb="lg" variant="solid" />
            <Title size="md">Налаштування базового перекладу</Title>
            <Select
                mt="md"
                className={styles.input}
                label="Мова перекладу"
                placeholder="Оберіть мову"
                renderOption={renderLanguageSelectOption}
                data={languages}
                clearable
                value={form.values.language === "" ? null : form.values.language}
                error={form.errors.language ?? ""}
                onChange={(value) => form.setFieldValue("language", value || "")}
            />
            <FileInput
                leftSection={<IconPhoto />}
                className={styles.input}
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
                </Box>
            )}
            {true && (
                <Box className={styles.previewImageBackground} p="sm" bg="gray.3" mt="sm" mb="sm">
                    <Image

                        alt="Прев'ю зображення"
                        radius="md"
                        h={350}
                        fit="contain"
                    />
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


        </Box>
        <Group mt="lg" justify="flex-start">
            <Button type="submit" size="md">Зберегти</Button>
        </Group>
    </form>
};

export default ArticleMetaForm;