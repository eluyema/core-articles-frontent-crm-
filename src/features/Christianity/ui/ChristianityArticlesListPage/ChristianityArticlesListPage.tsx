import {
    Container,
    Grid,
    Select,
    Group,
    Title,
    Stack,
    Text, Button,
} from "@mantine/core";
import useChristianityArticlesListPage from "./useChristianityArticlesListPage";
import ChristianityArticleCard, {ChristianityArticleCardSkeleton} from "../ChristianityArticleCard";
import {Link} from "@tanstack/react-router";


const ChristianityArticlesListPage = () => {
    const {
        filteredArticles,
        loading,
        categoryFilter,
        subcategoryFilter,
        updateCategoryFilter,
        updateSubcategoryFilter,
        categories,
        subcategories,
    } = useChristianityArticlesListPage();

    return (
        <Container size="lg" py="md">
            <Stack>
                <Title order={2}>Християнські статті</Title>

                <Group grow align="end" mb="lg">
                    <Select
                        label="Фільтр по категорії"
                        placeholder="Оберіть категорію"
                        data={categories.map((c) => ({ value: c, label: c }))}
                        value={categoryFilter}
                        onChange={(value) => updateCategoryFilter(value || "")}
                        clearable
                    />
                    <Select
                        label="Фільтр по підтемі"
                        placeholder="Оберіть підкатегорію"
                        data={subcategories.map((s) => ({ value: s, label: s }))}
                        value={subcategoryFilter}
                        onChange={(value) => updateSubcategoryFilter(value || "")}
                        clearable
                        mr="xl"

                    />
                    <Button ml="xl" color="green" size="md" component={Link} to={`/admin/christianity/articles/new-article`}>
                        Створити нову статтю 🤓
                    </Button>
                </Group>

                {loading ? (
                    <Grid>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ChristianityArticleCardSkeleton key={i} />
                        ))}
                    </Grid>
                ) : filteredArticles.length === 0 ? (
                    <Text>Немає знайдених статей.</Text>
                ) : (
                    <Grid>
                        {filteredArticles.map((article) => (
                            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={article.id}>
                                <ChristianityArticleCard article={article} />
                            </Grid.Col>
                        ))}
                    </Grid>
                )}
            </Stack>
        </Container>
    );
};

export default ChristianityArticlesListPage;
