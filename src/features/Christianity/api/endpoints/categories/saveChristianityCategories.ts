import {api} from "../../../../../app/api";
import {ChristianityCategory} from "../../../modal/entities/ChristianityCategory.ts";
import {getAppConfig} from "../../../../../shared/config/getAppConfig.ts";

type ChristianityCategoryDto = Array<{
    id?: number;
    code: string;
    subcategories: Array<{id?: number; code: string}>;
}>;

const adaptDto = (categories: ChristianityCategory[]):ChristianityCategoryDto=>{
    return categories.map(category=> {
        return {
            id: category.dbId,
            code: category.code,
            subcategories: category.subcategories.map(subcategory=> {
                return {
                    id: subcategory.dbId,
                    code: subcategory.code
                }
            })
        }
    })
}

export const saveChristianityCategories = async (categories: ChristianityCategory[]): Promise<ChristianityCategory[]> => {

    const { serverUrl } = getAppConfig();

    const url = serverUrl + "/api/christianity/categories/bulk";
    return await api.put(url, {
        json: adaptDto(categories)
    }).json();
};
