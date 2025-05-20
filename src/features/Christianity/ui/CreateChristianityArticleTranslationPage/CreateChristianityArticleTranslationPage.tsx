import {Container, Button, Title, Stepper, LoadingOverlay} from "@mantine/core";
import {Link} from "@tanstack/react-router";
import ArticleEditor from "../../../ArticleEditor/ui/ArticleEditor";
import {useState} from "react";
import styles from './index.module.scss'
import ArticleTranslationMetaForm from "./ArticleTranslationMetaForm";
import useCreateChristianityArticleTranslationPage from "./useCreateChristianityArticleTranslationPage.ts";
import googleTranslateIcon from '../../../../assets/googleTranslateIcon.svg';

enum CreateArticleSteps {
    ARTICLE_META = 0,
    ARTICLE_CONTENT = 1,
    ARTICLE_FINISHED
}

const CreateChristianityArticleTranslationPage = () => {
    const {createChristianityArticleTranslation, loading, slug,  article, syncContentData} = useCreateChristianityArticleTranslationPage();
    const [currentStep, setCurrentStep] = useState<CreateArticleSteps>(CreateArticleSteps.ARTICLE_META);

    const handleSubmitMetaForm = () => {
        setCurrentStep(CreateArticleSteps.ARTICLE_CONTENT);
    }

    return <div className={styles.container}>
        <Container className={styles.formContainer} size="md" py="md">
            <Button mt="md" mb="sm" variant="outline" component={Link} to={`/admin/christianity/articles/${slug}`}>Повернутись до статті</Button>
            <Title mb="sm">Створення перекладу статті <img src={googleTranslateIcon} height={30} alt="зображення гугл перекладача"/></Title>
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
            {currentStep === CreateArticleSteps.ARTICLE_META && (<ArticleTranslationMetaForm handleSubmitMetaForm={handleSubmitMetaForm}/>)}
        </Container>
         <ArticleEditor
                className={currentStep !== CreateArticleSteps.ARTICLE_CONTENT ? styles.hidden : ""}
                disableEdit={loading}
                defaultContent={article.content}
                syncDataBeforeDestroy={syncContentData}
                onSave={(content)=>{createChristianityArticleTranslation({content})}}
         />
        <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2, fixed: true, center: true }}
            loaderProps={{  color: 'pink', type: 'bars' }}
        />
    </div>
}

export default CreateChristianityArticleTranslationPage