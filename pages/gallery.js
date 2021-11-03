import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Link from '../components/Link';
import SideBar from '../components/SideBar';
import StickyColumn from '../components/StickyColumn';
import { HOST_URL } from '../libs/const';
import { getGalleryProps } from '../libs/utils/pageProps';


export default function Gallery({ pageProps }) {
    const galleryRef = useRef()
    const [pageIndex, setPageIndex] = useState(1)
    const [nomore, setnomore] = useState(false)
    const { data } = useSWR(HOST_URL + `/instagram_${pageIndex}.json`, async (api) => {
        const res = await fetch(api)
        return res.json()
    })
    useEffect(() => {
        if (data) {
            var div = document.createElement('div');
            div.innerHTML = data.html.trim()
            // console.log(div)
            const elements = Object.keys(data.resizedImages).map(index => {
                const image = data.resizedImages[index]
                console.log("#sbi_" + image.id)
                const item = div.querySelector("#sbi_" + index)
                // console.log({ item })
                const img = item.querySelector(".sbi_photo")
                img.style.background = `url(https://myrecvan.com/wp-content/uploads/sb-instagram-feed-images/${image.id}full.jpg)`;
                img.style.backgroundSize = 'cover';
                img.style.backgroundPosition = 'center center';
                img.style.backgroundRepeat = 'no-repeat';
                return item.cloneNode(true)
            })

            galleryRef.current.append(...elements)
            // console.log(div)
            if (!data.feedStatus.shouldPaginate) {
                setnomore(!data.feedStatus.shouldPaginate)
            }
        }
    }, [data])
    return (
        <Layout pageProps={pageProps}>
            <style dangerouslySetInnerHTML={{
                __html: `
                .sbi_item {
                    width: 100%;
                    padding-top: 100%;
                    position:relative;
                }
                .sbi_photo {
                    width: 100%;
                    position: absolute;
                    top:0;
                    height: 100%;
                }
                .sbi_photo:hover {
                    opacity:0.8;
                }
                .sbi-screenreader {
                    opacity: 0;
                    width: 0;
                    height: 0;
                    position: absolute;
                }
                .sbi_photo svg{
                    font-size: 18px;
                    width:1em;
                    color:white
                }
                .sbi_photo .fa-clone{
                    position: absolute;
                    right: 8px;
                    top: 8px;
                    
                }
                .sbi_photo img{
                    display:none
                }
                .sbi_playbtn {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                }
            `}}></style>
            <div className="py-9 bg-[#272726] text-white">
                <div className="content_wrap">
                    <div className="sc_layouts_column sc_layouts_column_align_center">
                        <Container>
                            <div className="flex flex-col items-center justify-center text-center mx-[12px] my-[9px]">
                                <div className="sc_layouts_title_title">
                                    <h1
                                        itemProp="headline"
                                        className="text-[27px] lg:text-[52px] xl:leading-[67px] font-bold leading-normal">
                                        Gallery
                                    </h1>
                                </div>
                                <div className="lg:text-[18px] lg:leading-[22px]  ">
                                    <div className="font-bold">
                                        <Link
                                            className="text-[#888583]"
                                            href="/">
                                            Home
                                        </Link>
                                        <span className="mx-[0.3em] opacity-75 text-2xl">
                                            <svg
                                                className="inline-block"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeWidth={0}
                                                viewBox="0 0 24 24"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M14.526 6.10576C15.0265 6.33917 15.2667 6.88343 15.0625 7.3214L9.88541 18.4237C9.68118 18.8616 9.10985 19.0275 8.60931 18.7941C8.10877 18.5607 7.86857 18.0164 8.0728 17.5784L13.2499 6.47616C13.4541 6.03819 14.0254 5.87235 14.526 6.10576Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                        <span className="breadcrumbs_item current opacity-75 p2">
                                            Gallery
                                        </span>
                                    </div>
                                </div>{' '}
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
            <Container className="flex flex-col lg:flex-row lg:space-x-[30px] py-16 lg:py-[110px] gap-y-16 items-start">
                <div className=" flex-1 w-full space-y-2">
                    <div className="flex space-x-3 items-center">
                        <div className="text-[25px] w-[50px] h-[50px] bg-[#333] rounded-full flex justify-center items-center text-white">
                            <svg
                                width="1em"
                                height="1em"
                                aria-hidden="true"
                                data-fa-processed=""
                                aria-label="Instagram"
                                data-prefix="fab"
                                data-icon="instagram"
                                role="img"
                                viewBox="0 0 448 512">
                                <path
                                    fill="currentColor"
                                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-[1.2308em] lead-[1.5em]">
                                myrecvan
                            </h3>
                        </div>
                    </div>
                    <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full p-2">
                    </div>
                    <div className="flex space-x-3 justify-center">
                        {!nomore && <button
                            onClick={() => {
                                setPageIndex(pageIndex + 1)
                            }}
                            type="submit"
                            className="cursor-pointer text-[13px] leading-normal py-[7px] px-[14px] font-body bg-[#333] hover:bg-[#c0b9a8] text-white rounded border hover:border-[color:#c0b9a8] capitalize flex items-center hover:opacity-80">
                            Load More...
                            <div
                                className={
                                    !data
                                        ? 'transition-all opacity-100 ml-0 pl-3 pointer-events-none'
                                        : 'transition-all opacity-0 ml-[-44px] pl-3'
                                }>
                                <svg
                                    className="animate-spin h-5 w-5 mr-3"
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    version="1.1"
                                    viewBox="0 0 16 16"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 2c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM12.359 8c0 0 0 0 0 0 0-0.906 0.735-1.641 1.641-1.641s1.641 0.735 1.641 1.641c0 0 0 0 0 0 0 0.906-0.735 1.641-1.641 1.641s-1.641-0.735-1.641-1.641zM10.757 12.243c0-0.821 0.665-1.486 1.486-1.486s1.486 0.665 1.486 1.486c0 0.821-0.665 1.486-1.486 1.486s-1.486-0.665-1.486-1.486zM6.654 14c0-0.743 0.603-1.346 1.346-1.346s1.346 0.603 1.346 1.346c0 0.743-0.603 1.346-1.346 1.346s-1.346-0.603-1.346-1.346zM2.538 12.243c0-0.673 0.546-1.219 1.219-1.219s1.219 0.546 1.219 1.219c0 0.673-0.546 1.219-1.219 1.219s-1.219-0.546-1.219-1.219zM0.896 8c0-0.61 0.494-1.104 1.104-1.104s1.104 0.494 1.104 1.104c0 0.61-0.494 1.104-1.104 1.104s-1.104-0.494-1.104-1.104zM2.757 3.757c0 0 0 0 0 0 0-0.552 0.448-1 1-1s1 0.448 1 1c0 0 0 0 0 0 0 0.552-0.448 1-1 1s-1-0.448-1-1zM14.054 3.757c0 1-0.811 1.811-1.812 1.811s-1.812-0.811-1.812-1.811c0-1.001 0.811-1.811 1.812-1.811s1.812 0.811 1.812 1.811z" />
                                </svg>
                            </div>
                        </button>
                        }
                        <a
                            href="https://www.instagram.com/myrecvan/"
                            target="_blank"
                            rel="noopener nofollow noreferrer"
                            className="cursor-pointer flex items-center  text-[13px] leading-normal py-[7px] px-[14px] font-body bg-[#408bd1] hover:bg-[#c0b9a8] text-white rounded border hover:border-[color:#c0b9a8] capitalize hover:opacity-80">
                            <div className="inline-block mr-2 text-[15px]">
                                <svg width="1em" height="1em" aria-hidden="true" data-fa-processed aria-label="Instagram" data-prefix="fab" data-icon="instagram" role="img" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                </svg>
                            </div>
                            Follow on Instagram
                        </a>
                    </div>
                </div>
                <StickyColumn offsetTop={120} offsetBottom={20}>
                    <SideBar pageProps={pageProps} />{' '}
                </StickyColumn>
            </Container>
        </Layout>
    );
}


export async function getStaticProps() {
    return {
        props: getGalleryProps()
    };
}
