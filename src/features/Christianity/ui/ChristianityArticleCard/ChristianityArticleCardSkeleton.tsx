import { Card, Skeleton, Grid } from "@mantine/core";

const ArticleCardSkeleton = () => (
    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Skeleton height={160} />
            <Skeleton height={20} mt="md" />
            <Skeleton height={14} mt="sm" />
            <Skeleton height={14} mt="sm" />
            <Skeleton height={14} mt="sm" width="60%" />
            <Skeleton height={8} mt="sm" width="30%" />
            <Skeleton height={8} mt="sm" width="50%" />
            <Skeleton height={8} mt="sm" width="40%" />
            <Skeleton height={36} mt="md" radius="sm" />
        </Card>
    </Grid.Col>
);

export default ArticleCardSkeleton;
