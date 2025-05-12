import {memo, useEffect, useRef, useState} from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';

import { uploadArticleImage } from '../../api/ednpoints/uploadImage.ts';
import styles from './index.module.scss';
import { Button } from '@mantine/core';
import { useAlert } from '../../../Alert/model/hooks/useAlert.ts';
import classNames from "classnames";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

type ArticleEditorProps = {
    onSave: (content: OutputData) => void;
    syncDataBeforeDestroy: (content: OutputData) => void;
    defaultContent: OutputData;
    disableEdit: boolean;
    className?: string;
};

function ArticleEditor({
                           className = "",
                           onSave,
                           defaultContent,
                           syncDataBeforeDestroy,
                           disableEdit = false,
                       }: ArticleEditorProps) {
    const { showAlert } = useAlert();
    const editorRef = useRef<HTMLDivElement>(null);
    const editorInstanceRef = useRef<EditorJS | null>(null);

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initEditor = async () => {
            // Ensure previous instance is destroyed
            if (editorInstanceRef.current) {
                await editorInstanceRef.current.isReady; // Wait until ready if not yet
                await editorInstanceRef.current.destroy();
                editorInstanceRef.current = null;
            }

            const editor = new EditorJS({
                holder: editorRef.current!,
                placeholder: 'Введіть текст статті тут...',
                data: JSON.parse(JSON.stringify(defaultContent)),
                tools: {
                    embed: Embed,
                    table: Table,
                    marker: Marker,
                    list: List,
                    warning: Warning,
                    code: Code,
                    linkTool: LinkTool,
                    raw: Raw,
                    header: Header,
                    quote: Quote,
                    checklist: CheckList,
                    delimiter: Delimiter,
                    inlineCode: InlineCode,
                    simpleImage: SimpleImage,
                    image: {
                        class: Image,
                        config: {
                            uploader: {
                                async uploadByFile(file: File) {
                                    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                                        showAlert({
                                            message: 'Підтримуються лише зображення JPG, PNG або WEBP. Видаліть блок з помилкою!',
                                            color: 'red',
                                        });
                                        return { success: 0 };
                                    }

                                    if (file.size > MAX_FILE_SIZE) {
                                        showAlert({
                                            message: 'Розмір зображення не повинен перевищувати 2MB. Видаліть блок з помилкою!',
                                            color: 'red',
                                        });
                                        return { success: 0 };
                                    }

                                    const url = await uploadArticleImage(file);
                                    return {
                                        success: 1,
                                        file: { url },
                                    };
                                },
                            },
                        },
                    },
                },
                onReady: () => {
                    editorInstanceRef.current = editor;
                    setIsReady(true);
                },
            });
        };

        initEditor();

        return () => {
            destroyEditor()
        }
    }, [defaultContent]);




    const destroyEditor = () => {
        const editor = editorInstanceRef.current;
        if (!editor) return;

        editor.destroy?.();

        editorInstanceRef.current = null;
        setIsReady(false);
    };

    const handleSave = async () => {
        const editor = editorInstanceRef.current;
        if (!editor) return;

        try {
            const outputData = await editor.save();
            syncDataBeforeDestroy(outputData);
            onSave(outputData);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : '';
            showAlert({
                title: 'Помилка',
                message: `Помилка збереження змісту статті${errorMessage ? `: ${errorMessage}` : ''}`,
                color: 'red',
            });
        }
    };

    return (
        <div className={classNames(styles.container, className)}>
            <div ref={editorRef} className={styles.editor} />
            <div className={styles.buttonBlock}>
                <Button onClick={handleSave} disabled={!isReady || disableEdit} size="lg">
                    Зберегти
                </Button>
            </div>
        </div>
    );
}

export default memo(ArticleEditor);
