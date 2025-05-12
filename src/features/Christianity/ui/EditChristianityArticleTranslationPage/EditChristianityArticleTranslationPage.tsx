import {Container, Button, Title, Stepper, LoadingOverlay} from "@mantine/core";
import {Link} from "@tanstack/react-router";
import ArticleEditor from "../../../ArticleEditor/ui/ArticleEditor";
import {useState} from "react";
import styles from './index.module.scss'
import ArticleTranslationMetaForm from "./ArticleTranslationMetaForm";
import useEditChristianityArticleTranslationPage from "./useEditChristianityArticleTranslationPage.ts";
import googleTranslateIcon from "../../../../assets/googleTranslateIcon.png";

enum EditArticleTranslationSteps {
    ARTICLE_META = 0,
    ARTICLE_CONTENT = 1,
    ARTICLE_FINISHED
}

const EditChristianityArticleTranslationPage = () => {
    const { editArticle, loading, article, slug, syncContentData} = useEditChristianityArticleTranslationPage();
    const [currentStep, setCurrentStep] = useState<EditArticleTranslationSteps>(EditArticleTranslationSteps.ARTICLE_META);

    const handleSubmitMetaForm = () => {
        setCurrentStep(EditArticleTranslationSteps.ARTICLE_CONTENT);
    }

    return <div className={styles.container}>
        <Container className={styles.formContainer} size="md" py="md">
            <Button mt="md" mb="sm" variant="outline" component={Link} to={`/admin/christianity/articles/${slug}`}>Повернутись до статті</Button>
            <Title mb="sm">Редагування перекладу статті <img src={googleTranslateIcon} height={30}
                                                             alt="зображення гугл перекладача"/></Title>
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
            {currentStep === EditArticleTranslationSteps.ARTICLE_META && (<ArticleTranslationMetaForm handleSubmitMetaForm={handleSubmitMetaForm}/>)}
        </Container>
        <ArticleEditor
            className={currentStep !== EditArticleTranslationSteps.ARTICLE_CONTENT ? styles.hidden : ""}
            disableEdit={loading}
            defaultContent={article.content}
            syncDataBeforeDestroy={syncContentData}
            onSave={(content) => editArticle({content})}
        />
        <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2, fixed: true, center: true }}
            loaderProps={{  color: 'pink', type: 'bars' }}
        />
    </div>
}

export default EditChristianityArticleTranslationPage