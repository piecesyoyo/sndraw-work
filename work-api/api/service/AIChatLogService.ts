import AIChatLogModel from "@/models/AIChatLogModel";
import AIPlatformService from "./AIPlatformService";
import { v4 as uuidv4 } from 'uuid';
import { StatusEnum } from "@/constants/DataMap";


class AIChatLogService {

    // 查询AI对话日志列表
    static async queryAIChatLogList(params: any) {
        const { query } = params
        const list: any = await AIChatLogModel.findAll({
            where: {
                ...(query || {})
            }
        })

        if (!list || list?.length < 1) {
            return []
        }
        return list
    }

    // 查询AI对话日志详情
    static async getAIChatLogById(id: string) {
        if (!id) {
            throw new Error("ID不能为空");
        }
        return await AIChatLogModel.findByPk(id)
    }


    // 添加AI对话日志
    static async addAIChatLog(params: any) {
        const { platform, model } = params
        if (!platform) {
            throw new Error("平台参数错误");
        }
        if (!model) {
            throw new Error("模型参数错误");
        }
        const result = await AIChatLogModel.create({
            id: params?.id || uuidv4(),
            chat_id: params?.chat_id || uuidv4(),
            platform: platform,
            model: model,
            type: params?.type || 1,
            input: params?.input || {},
            output: params?.output || "",
            userId: params?.userId || 0,
            status: params?.status || StatusEnum.DISABLE,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        });
        return result
    }
    // 删除AI对话日志
    static async deleteAIChatLog(params: any) {
        const { platform, model } = params
        if (!platform) {
            throw new Error("平台参数错误");
        }
        if (!model) {
            throw new Error("模型参数错误");
        }
        // 删除AI对话日志在数据库中的记录
        const deleteResult = await AIChatLogModel.destroy({
            where: {
                platform: platform,
                model: model,
            },
        });

        if (!deleteResult) {
            throw new Error("AI对话日志不存在或已删除");
        }

        return deleteResult
    }
}

export default AIChatLogService