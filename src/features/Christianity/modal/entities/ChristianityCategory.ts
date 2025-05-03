import {ChristianitySubcategory} from "./ChristianitySubcategory.ts";

export interface ChristianityCategory {
    dbId?: number;
    tempId: number;
    code: string;
    subcategories: ChristianitySubcategory[];
}