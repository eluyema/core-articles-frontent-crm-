import {
    Button,
    Card,
    Container, Divider, Grid, Group, Image, Loader, Text, Title,
} from "@mantine/core";
import useEditChristianityArticlePage from "./useEditChristianityArticlePage.ts";
import {Link} from "@tanstack/react-router";
import "../../../../assets/flags/css/flags.css";
import CountryFlag from "../../../../shared/ui/CountryFlag";
import EditArticleForm from "./EditArticleForm";
import DeleteArticleModal from "./DeleteArticleModal";
import articleIcon from "../../../../assets/article.png";

const EditChristianityArticlePage = () => {

    const { article, loading, categories, updateArticle, handleDeleteArticle } = useEditChristianityArticlePage();

    if(loading) {
        return <Container size="md" py="md">
            <Button mt="md" mb="sm" variant="outline" component={Link} to={`/admin/christianity/articles`}>Повернутись до списку</Button>
            <Group flex-align="end" mt="lg">
                <Loader mt="xl" ml="auto" mr="auto"/>
            </Group>
        </Container>
    }

    if(!article) {
        return <Container size="md" py="md">
            <Button mt="md" mb="sm" variant="outline" component={Link} to={`/admin/christianity/articles`}>Повернутись до списку</Button>
            <Group flex-align="end" mt="lg">
                <Title mt="lg" ml="auto" mr="auto">Статті за цією адресею скоріш за все не існує</Title>
                <Button ml="auto" mr="auto" component={Link} to="/admin/christianity/articles">Повернутись до списку статей</Button>
            </Group>
        </Container>
    }

    return (
        <Container size="md" py="md">
            <Button mt="md" mb="sm" variant="outline" component={Link} to={`/admin/christianity/articles`}>Повернутись до списку</Button>
            <Group justify="space-between">
                <Title mb="sm">Редагування статті <img src={articleIcon} height={30}
                                                       alt="зображення статті"/></Title>
                <DeleteArticleModal handleDelete={handleDeleteArticle}/>
            </Group>
            {!!article && !!categories && <EditArticleForm article={article} categories={categories} updateArticle={updateArticle}/>}
            <Divider variant="dashed" mt="xl" mb="xl"/>
            <Title size="lg" mt="xs" mb="xs">Доступні переклади</Title>
            <Button color="green" size="md" mb="md" component={Link} to={`/admin/christianity/articles/${article.slug}/new-translation`}>Створити новий переклад</Button>
            <Grid>
                {!!article && article.translations.map((translation) => (
                    <Grid.Col span={{ base: 12, sm: 6, md: 6 }} key={translation.id}>
                        <Card key={translation.id} shadow="sm" padding="lg" radius="md" withBorder>
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
                            <Text>Мова {translation.language}</Text>
                            <CountryFlag language={translation.language}/>
                            <Button mt="xs" component={Link} to={`/admin/christianity/articles/${article.slug}/${translation.language}`}>
                                Переглянути
                            </Button>
                        </Card>
                    </Grid.Col>
                ))}
                </Grid>
        </Container>
    );
};

export default EditChristianityArticlePage;

