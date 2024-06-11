import { Router, type Request, type Response } from "express";
import download from 'download';

export const updaterouter = Router();

interface Props {
    current_version: string;
    target: string;
}

interface Data {
    version: string;
    notes: string;
    pub_date: string;
    url: string;
    signature: string;
    platforms: Platform;
}

interface Platform {
    url: string;
    signature: string;
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
updaterouter.get('/', (req: Request<{}, {}, {}, Props>, res: Response) => {
    if(req.query.current_version && req.query.target) {
        GithubLatest().then(async (release: any) => {
            if(release.name !== req.query.current_version) {
                if(req.query.target === "windows") {
                    let url ="";

                    for(const asset of release.assets) {
                        if(asset.name === "latest.json") {
                            url = asset.url;
                        }
                    }

                    const asset: any = await getData(url);
                    const data: Data = JSON.parse((await download(asset.browser_download_url)).toString());

                    res.status(200).send({
                        version: data.version,
                        notes: release.body,
                        pub_date: data.pub_date,
                        url: data.platforms["windows-x86_64"].url,
                        signature: data.platforms["windows-x86_64"].signature
                    })

                }
                else {
                    res.status(204).send()
                }
            }
            else {
                res.status(204).send()
            }
        })
    }
    else {
        console.log("Update params incorrect")
        res.status(400).json({status: 400, message: "Missing parameters"});
    }
});

interface Options {
    method?: string;
    headers?: {
        Authorization: string;
    };
}

const fetchWithToken = async (url: string, options?: Options | null) => {
    const token = process.env.GH_TOKEN;
    if (!token) {
        throw new Error('GitHub token not found in environment variables.');
    }
    
    const headers = {
        Authorization: `token ${token}`,
    };

    const response = await fetch(url, { ...options, headers });
    return response.json();
};

const GithubLatest = async () => {
    const url = "https://api.github.com/repos/NetSafeGuard/NSG_ADMIN/releases/latest";
    return fetchWithToken(url);
};

const getData = async (url: string) => {
    return fetchWithToken(url);
};