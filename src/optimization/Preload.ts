import {useEffect} from "react";

type ResourceType = 'image' | 'audio';

interface ResourceInfo {
    location: string;
    type: ResourceType;
}

const CurtainSceneSrcArr: ResourceInfo[] = [
    {location: './scene/0/curtain.png', type: 'image'}
]

const StartSceneSrcArr: ResourceInfo[] = [
    {location: './scene/1/overworld.mp3', type: "audio"},
]

const HelloSceneSrcArr: ResourceInfo[] = [
    {location: './scene/2/coin.mp3', type: "audio"},
    {location: './scene/2/jump.mp3', type: "audio"},
    {location: './scene/2/groundTile.png', type: "image"},
    {location: './scene/2/cloud.png', type: "image"},
    {location: './scene/2/block.png', type: "image"},
    {location: './scene/2/mario.png', type: "image"},
]

const InfoSceneSrcArrFirst: ResourceInfo[] = [
    {location: './scene/3/profile/profileImg.png', type: "image"},
    {location: './scene/3/background/seaweed.png', type: "image"},
    {location: './scene/3/background/menuicon.png', type: "image"},
    {location: './scene/3/menu/leftswim.png', type: "image"},
    {location: './scene/3/menu/rightswim.png', type: "image"},
]

const InfoSceneSrcArrSecond: ResourceInfo[] = [
    {location: './scene/3/background/bubble.png', type: "image"},
    {location: './scene/3/background/squid.png', type: "image"},
    {location: './scene/3/skill/backend/jenkins.png', type: "image"},
    {location: './scene/3/skill/backend/jpa.png', type: "image"},
    {location: './scene/3/skill/backend/mssql.png', type: "image"},
    {location: './scene/3/skill/backend/mybatis.png', type: "image"},
    {location: './scene/3/skill/backend/mysql.png', type: "image"},
    {location: './scene/3/skill/backend/springboot.png', type: "image"},
    {location: './scene/3/skill/frontend/react.png', type: "image"},
    {location: './scene/3/skill/frontend/mobx.png', type: "image"},
    {location: './scene/3/skill/frontend/reactquery.png', type: "image"},
    {location: './scene/3/skill/frontend/tanstack-router.png', type: "image"},
    {location: './scene/3/skill/frontend/capacitor.png', type: "image"},
    {location: './scene/3/skill/frontend/electron.png', type: "image"},
    {location: './scene/3/skill/language/java.png', type: "image"},
    {location: './scene/3/skill/language/javascript.png', type: "image"},
    {location: './scene/3/skill/language/typescript.png', type: "image"},
]

const preload = (srcArrArr: ResourceInfo[][]) => {

    const load = (resource: ResourceInfo) => {
        return new Promise((resolve) => {
            if (resource.type === "image") {
                loadImage(resource, resolve);
            } else if (resource.type === "audio") {
                loadAudio(resource, resolve);
            }
        })
    }

    const loadImage = (resource: ResourceInfo, resolve: (value: unknown) => void) => {
        const img = new Image();
        img.onload = () => {
            resolve(true)
        };
        img.src = resource.location;
    }

    const loadAudio = (resource: ResourceInfo, resolve: (value: unknown) => void) => {
        const audio = new Audio(resource.location);
        audio.oncanplaythrough = () => {
            resolve(true);
        }
    }

    const parallel = (srcArr: ResourceInfo[]) => {
        return Promise.all(srcArr.map(src => load(src)));
    }

    const sequential = async (srcArrArr: ResourceInfo[][]) => {
        for await (const srcArr of srcArrArr) {
            await parallel(srcArr);
        }
    }

    sequential(srcArrArr);
}

const usePreload = () => {
    useEffect(() => {
        preload([
            CurtainSceneSrcArr,
            [...StartSceneSrcArr, ...HelloSceneSrcArr],
            InfoSceneSrcArrFirst,
            InfoSceneSrcArrSecond
        ]);
    }, []);
}


export default usePreload;