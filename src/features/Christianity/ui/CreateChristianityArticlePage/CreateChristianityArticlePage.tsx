import {Container, Button, Title, Stepper} from "@mantine/core";
import {Link} from "@tanstack/react-router";
import ArticleEditor from "../../../ArticleEditor/ui/ArticleEditor";
import {useState} from "react";
import styles from './index.module.scss'
import ArticleMetaForm from "./ArticleMetaForm";

enum CreateArticleSteps {
    ARTICLE_META = 0,
    ARTICLE_CONTENT = 1,
    ARTICLE_FINISHED
}

const CreateChristianityArticlePage = () => {
    const [currentStep, setCurrentStep] = useState<CreateArticleSteps>(CreateArticleSteps.ARTICLE_META);

    const handleSubmitMetaForm = () => {
        setCurrentStep(CreateArticleSteps.ARTICLE_CONTENT);
    }

    return <div className={styles.container}>
        <Container className={styles.formContainer} size="md" py="md">
            <Button mt="md" mb="sm" variant="outline" component={Link} to={`/admin/christianity/articles`}>Повернутись до списку</Button>
            <Title mb="sm">Створення статті</Title>
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
        {currentStep === CreateArticleSteps.ARTICLE_CONTENT && <ArticleEditor onChange={(data)=>console.log(data)} />}

    </div>
}

export default CreateChristianityArticlePage