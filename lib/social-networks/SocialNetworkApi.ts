import { DbToken } from "../../types/db";
import { SocialNetwork } from "../../types/global";
import database from "../database";

export default abstract class SocialNetworkApi {
    networkName: SocialNetwork;
    protected userId: number;
    protected token: string;
    protected dbToken: DbToken;

    protected constructor(userId: number, networkName: SocialNetwork) {
        this.userId = userId;
        this.networkName = networkName;
    }

    async prepare(): Promise<void> {
        this.dbToken = await database.getToken(this.userId, this.networkName);
        this.token = this.dbToken.Code;

        if (this.dbToken.Expire && this.dbToken.Expire < new Date())
            await this.refresh();
    }

    protected async refresh(): Promise<void> {
        throw new Error("Not implemented");
    }

    abstract post(content: string, option?: any): Promise<void>;

}