import RobotoMonoBold from "@/assets/roboto-mono-700.ttf";
import RobotoMono from "@/assets/roboto-mono-regular.ttf";
import Zcoolkuaile from "@/assets/ZCOOLKuaiLe-Regular.ttf";
import { siteConfig } from "@/site-config";

import { Resvg } from "@resvg/resvg-js";
import type { APIContext, InferGetStaticPropsType } from "astro";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { getSortedAllPostsAndDiaries } from "src/utils/post";

const ogOptions: SatoriOptions = {
    // debug: true,
    fonts: [
        {
            data: Buffer.from(RobotoMono),
            name: "Roboto Mono",
            style: "normal",
            weight: 400,
        },
        {
            data: Buffer.from(RobotoMonoBold),
            name: "Roboto Mono",
            style: "normal",
            weight: 700,
        },
        {
            data: Buffer.from(Zcoolkuaile),
            name: "ZCOOL KuaiLe",
            style: "normal",
            weight: 400,
        },
    ],
    height: 630,
    width: 1200,
};

const markup = (title: string, pubDate: string) =>
    html`<div tw="flex flex-col w-full h-full bg-[#1d1f21] text-[#c9cacc]">
		<div tw="flex flex-col flex-1 w-full p-10 justify-center">
			<p tw="text-2xl mb-6">${pubDate}</p>
			<h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
		</div>
		<div tw="flex items-center justify-between w-full p-10 border-t border-[#2bbc89] text-xl">
			<div tw="flex items-center">
				<img tw="w-14 h-14 rounded-full" src="https://pictures.kazoottt.top/2025/01/20250130-121E9E4A-39FB-46DD-8D64-EAA3C77C6503.jpeg" alt="avatar" />
				<p tw="ml-3 font-semibold">${siteConfig.title}</p>
			</div>
			<p>by ${siteConfig.author}</p>
		</div>
	</div>`;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
    const { pubDate, title } = context.props as Props;
    console.log("context.props", context.props)
    const postDate = pubDate instanceof Date
        ? pubDate.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : pubDate;

    const htmlElement = markup(title, postDate);
    const svg = await satori(htmlElement, ogOptions);
    const png = new Resvg(svg).render().asPng();
    return new Response(png, {
        headers: {
            "Cache-Control": "public, max-age=31536000, immutable",
            "Content-Type": "image/png",
        },
    });
}

export async function getStaticPaths() {
    const posts = await getSortedAllPostsAndDiaries();
    return posts
        .filter(({ data }) => !data.ogImage)
        .map((post) => ({
            params: { slug: post.id },
            props: {
                pubDate: post.data?.date,
                title: post.data.title,
            },
        }));
}

export const prerender = true;