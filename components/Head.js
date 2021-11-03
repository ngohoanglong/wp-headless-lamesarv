import { DefaultSeo } from 'next-seo';
import NextHead from 'next/head';
import data from '../data/cookedData.json';

const Head = () => {
    return (
        <>
            <DefaultSeo
                {...{
                    defaultTitle: data.generalSettings.title,
                    description: data.generalSettings.description
                }}
            />
            <NextHead>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <meta
                    name="robots"
                    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                />
            </NextHead>
        </>
    );
};

export default Head;
