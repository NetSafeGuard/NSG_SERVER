import { Router, Request, Response } from "express";
import download from 'download';

export const updaterouter = Router();

interface Props {
    current_version: string;
    target: string;
    arch: string;
}

updaterouter.get('/', (req: Request<{}, {}, {}, Props>, res: Response) => {
    if(req.query.current_version && req.query.target && req.query.arch) {
        GithubLatest().then(async (release: any) => {
            if(release.name !== req.query.current_version) {
                if(req.query.target == "windows") {
                    let url ="";
                    release.assets.forEach((asset: any) => {
                        if(asset.name.endsWith(".sig")) {
                            url = asset.url;
                        }
                    })

                    let data: any = await getSignature(url);
                    console.log(data)

                   res.status(200).send({
                        url: release.assets[0].browser_download_url,
                        version: release.name,
                        pub_date: release.published_at,
                        signature: (await download(data.browser_download_url)).toString() || null
                    })

                    console.log((await download(data.browser_download_url)).toString() || null)

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

const GithubLatest = async () => {
    const response = await fetch("https://api.github.com/repos/NetSafeGuard/NSG_ADMIN/releases/latest");
    return response.json();
}

const getSignature = async (url: string) => {
    const response = await fetch(url);
    return response.json();
}