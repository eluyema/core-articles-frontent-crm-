import {api} from "../../../../app/api";
import {ChristianityCategory} from "../../modal/entities/ChristianityCategory";

const backendUrl = "http://localhost:8080";

type ChristianityCategoryDto = {
    id: number;
    code: string;
    subcategories: Array<{id: number; code: string}>;
};

export const loadChristianityCategories = async (): Promise<ChristianityCategory[]> => {
    const url = backendUrl + "/api/christianity/categories";
    const data = await api.get<ChristianityCategoryDto[]>(url).json();

    return data.map((record)=> ({
            tempId: record.id,
            dbId: record.id,
            code: record.code,
            subcategories: record.subcategories.map(subcategory=> ({
                tempId: subcategory.id,
                    dbId: subcategory.id,
                    code: subcategory.code,
            }))
        }));
};
