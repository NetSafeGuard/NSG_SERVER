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
                        if(asset.name == "latest.json") {
                            url = asset.url;
                        }
                    })

                    let asset: any = await getData(url);
                    let data = (await download(asset.browser_download_url)).toString();

                    data = JSON.parse(data);

                    res.status(200).send({
                        version: data.version,
                        notes: data.notes,
                        pub_date: data.pub_date,
                        url: data["platforms"]["windows-x86_64"].url,
                        signature: data["platforms"]["windows-x86_64"].signature
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

const GithubLatest = async () => {
    const response = await fetch("https://api.github.com/repos/NetSafeGuard/NSG_ADMIN/releases/latest");
    return response.json();
}

const getData = async (url: string) => {
    const response = await fetch(url);
    return response.json();
}