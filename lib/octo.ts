import { Octokit } from "@octokit/core";

const OWNER = "wujunchuan";
const REPO = "beancount";

/* 申请 GITHUB_TOKEN： https://github.com/settings/tokens/new?scopes=repo */
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

/**
 * 更新 Beancount
 * @param data 需要追加的信息
 */
export const appendToBeancountContent = async (data: string, msg: string) => {
    const response = await octokit.request(
        'GET /repos/{owner}/{repo}/contents/{path}',
        {
            owner: OWNER,
            repo: REPO,
            // TODO: 根据年份归档
            path: 'example.bean',
        },
    );
    // Type Guard
    if ('content' in response.data) {
        const { content: encodeContent, encoding, sha, path } = response.data;
        const content = Buffer.from(encodeContent, encoding as BufferEncoding).toString();

        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            path,
            sha,
            owner: OWNER,
            repo: REPO,
            message: `telegram: ${msg!}`!,
            content: Buffer.from(`${content}${data}\n\n`).toString('base64'),
        });
    } else {
        throw new Error("No file");
    }
}
