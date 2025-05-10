import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';

import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import {uploadArticleImage} from "../../api/ednpoints/uploadImage.ts";
import styles from './index.module.scss';

export const EDITOR_JS_TOOLS = {
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
                        const url = await uploadArticleImage(file);
                        return {
                            success: 1,
                            file: {
                                url: url
                            },
                        };
                    },
                },
            },
        },
}

function App() {
        const editorRef = useRef<HTMLDivElement>(null);
        const editorInstanceRef = useRef<EditorJS | null>(null);

        const [isReady, setIsReady] = useState(false);

        useEffect(() => {
            if (!editorRef.current || editorInstanceRef.current) return;

            const editor = new EditorJS({
                holder: editorRef.current,
                placeholder: 'Введіть текст статті тут...',
                tools: EDITOR_JS_TOOLS,
                onReady: () => {
                    console.log("init")

                    editorInstanceRef.current = editor;
                    setIsReady(true);
                },
            });

            return () => {
                console.log("destroy")
                editor.destroy?.();
                editorInstanceRef.current = null;
                setIsReady(false); // reset ready state
            };
        }, []);

        const handleSave = async () => {
            if (editorInstanceRef.current) {
                try {
                    const outputData = await editorInstanceRef.current.save();
                    console.log('Saved data:', outputData);
                    // You can send `outputData` to your backend here
                } catch (error) {
                    console.error('Saving failed: ', error);
                }
            }
        };

        return (
            <div
                className={styles.container}
            >
                <div
                    ref={editorRef}
                    className={styles.editor}
                ></div>
                <button
                    onClick={handleSave}
                    disabled={!isReady}
                    className={styles.button}

                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isReady ? 'pointer' : 'not-allowed',
                    }}
                >
                    Save
                </button>
            </div>
        );
    }

    export default App;
