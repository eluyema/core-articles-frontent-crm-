import { Card, Text, Image, Button, Chip } from "@mantine/core";
import { Link } from '@tanstack/react-router';
import styles from './index.module.scss';
import {ChristianityArticleSlim} from "../../modal/entities/ChristianityArticle.ts";
import {getAppConfig} from "../../../../shared/config/getAppConfig.ts";
import {IconCheck, IconLink, IconX} from "@tabler/icons-react";

const preferableTranslationLanguages = ["en", "ua", "ru"];

type ChristianityArticleCardProps = {article: ChristianityArticleSlim}

const {articleWebsiteUrl} = getAppConfig();

const ChristianityArticleCard = ({ article }:ChristianityArticleCardProps) => {
    const translation = article.translations.find(tr => preferableTranslationLanguages.includes(tr.language)) ?? article.translations[0];
    const availableLanguages = article.translations.map(tr => tr.language);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            {translation ? (
                <>
                    <Card.Section>
                        <Image
                            src={translation.previewImageUrl}
                            alt={translation.previewImageAlt}
                            height={160}
                            fallbackSrc={translation.previewBlurImageImageUrl}
                        />
                    </Card.Section>
                    <Text mt="md" lineClamp={1}><strong>{translation.title}</strong></Text>
                    <Text size="sm" color="dimmed" lineClamp={2}>{translation.description}</Text>
                    <Text size="md">
                        Активна - {
                            article.active ?  (
                                <IconCheck size={14} color="var(--mantine-color-teal-6)" stroke={3} />
                            ) : (
                                <IconX size={14} color="var(--mantine-color-red-6)" stroke={3} />
                            )
                    }
                    </Text>
                    {article.active && <a target="_blank" rel="noopener noreferrer"
                       href={`${articleWebsiteUrl}/${translation.language}/articles/${article.category}/${article.subcategory}/${article.slug}`}><IconLink size="14px"/> Посилання на статтю</a>
                    }
                    <Text size="sm" color="dimmed">Доступні переклади:</Text>
                    <ul className={styles.langList}>
                        {availableLanguages.map((lang) => (
                            <li key={lang}><Chip checked={false}>{lang}</Chip></li>
                        ))}
                    </ul>
                </>
            ) : (
                <Text mt="md" mb="md">Стаття без жодного перекладу</Text>
            )}
            <Text size="s" color="gray">slug: <strong>{article.slug}</strong></Text>
            <Text size="xs" color="gray">Категорія: {article.category}</Text>
            <Text size="xs" color="gray">Підтема: {article.subcategory}</Text>
            <Text size="xs" color="gray">Автор: {article.author.username}</Text>
            <Text size="xs" color="gray">
                Останній раз редаговано: {new Date(article.updatedAt).toLocaleString("uk-UA", {
                day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
            })}
            </Text>
            <Button mt="xs" component={Link} to={`/admin/christianity/articles/${article.slug}`}>
                Переглянути
            </Button>
        </Card>
    );
};

export default ChristianityArticleCard;
