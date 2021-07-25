import costflow from "costflow";
import { NParseResult, UserConfig } from "costflow/lib/interface";

const defaultConfig = {
    mode: "beancount" as const,
    currency: "CNY",
    timezone: "Asia/Hong_Kong",
    account: {
        xj: "Assets:Cash",
        zfb: "Assets:Alipay",
        wx: "Assets:Wepay",
        food: "Expenses:Food:Meals",
        hs: "Expenses:Food:Drinks",
        sg: "Expenses:Food:Fruits",
        fz: "Expenses:House:Rent",
        didi: "Expenses:Traffic:Taxi",
        kuake: "Assets:Friends:Kuake",
        sier: "Assets:Friends:Sier",
        caigua: "Assets:Friends:Caigua"
    },
    formula: {
        aa: "@AA吃饭 {{ amount }} CNY {{ pre }} > kuake + sier + caigua + food",
        cf: "@吃饭 {{ amount }} CNY {{ pre }} > food",
        dd: "打的 {{ amount }} CNY {{ pre }} > Expenses:Traffic:Taxi"
    }
} as UserConfig;

export const parseCostflow = async (str: string, customConfig?: UserConfig):Promise<string> => {
    const config = Object.assign({}, defaultConfig, customConfig);
    try {
        const { output } = await costflow.parse(str, config) as NParseResult.Result;
        return output;
    } catch (e) {
        throw new Error(e);
    }
}
