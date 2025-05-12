import {Container, Button, Title, Stepper, LoadingOverlay} from "@mantine/core";
import {Link} from "@tanstack/react-router";
import ArticleEditor from "../../../ArticleEditor/ui/ArticleEditor";
import {useState} from "react";
import styles from './index.module.scss'
import ArticleMetaForm from "./ArticleMetaForm";
import useCreateChristianityArticlePage from "./useCreateChrisitanityArticlePage.ts";
import articleIcon from "../../../../assets/article.png";

enum CreateArticleSteps {
    ARTICLE_META = 0,
    ARTICLE_CONTENT = 1,
    ARTICLE_FINISHED
}

const CreateChristianityArticlePage = () => {
    const {createChristianityArticle, loading, article, syncContentData} = useCreateChristianityArticlePage();
    const [currentStep, setCurrentStep] = useState<CreateArticleSteps>(CreateArticleSteps.ARTICLE_META);

    const handleSubmitMetaForm = () => {
        setCurrentStep(CreateArticleSteps.ARTICLE_CONTENT);
    }

    return <div className={styles.container}>
        <Container className={styles.formContainer} size="md" py="md">
            <Button mt="md" mb="sm" variant="outline" component={Link} to={`/admin/christianity/articles`}>Повернутись до списку</Button>
            <Title mb="sm">Створення статті <img src={articleIcon} height={30}
                                                 alt="зображення статті"/></Title>
            <Stepper active={currentStep} onStepClick={setCurrentStep} allowNextStepsSelect={false}>
                <Stepper.Step
                    label="Перший крок"
                    description="Мета дані статті"
                    />

                <Stepper.Step
                    label="Останній крок"
                    description="Заповнення контента статті"
                />
            </Stepper>
            {currentStep === CreateArticleSteps.ARTICLE_META && (<ArticleMetaForm handleSubmitMetaForm={handleSubmitMetaForm}/>)}
        </Container>
        <ArticleEditor
            className={currentStep !== CreateArticleSteps.ARTICLE_CONTENT ? styles.hidden : ""}
            disableEdit={loading}
            defaultContent={article.content}
            syncDataBeforeDestroy={syncContentData}
            onSave={(content)=>createChristianityArticle({content})} />
        <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2, fixed: true, center: true }}
            loaderProps={{  color: 'pink', type: 'bars' }}
        />
    </div>
}

export default CreateChristianityArticlePage