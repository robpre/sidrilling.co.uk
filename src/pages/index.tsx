import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { FC, useState } from "react";

import { Layout } from "@/components/Layout";
import { getPage } from "@/lib/getContent";
import { Pages } from "@/types/ContentTypes";
import bigSandHand from "./big_sand_hand.jpg";

const IndexPage: FC<{
  mdxSource: MDXRemoteSerializeResult;
  data: Pages["index-page"];
}> = ({ mdxSource, data }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Layout layout="home">
      <div className="home-splash">
        <figure
          style={{
            transform: "translatez(0)",
            backgroundImage: `url(${
              imgLoaded ? bigSandHand.src : bigSandHand.blurDataURL
            })`,
            height: bigSandHand.height / 3,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            transition: "background-image .45s ease-in-out",
            paddingBottom: "1.4984391259105099%",
          }}
        >
          <img
            src={bigSandHand.src}
            style={{ display: "none" }}
            onLoad={() => {
              setImgLoaded(true);
            }}
            ref={(el) => setImgLoaded(Boolean(el?.complete))}
          />
          <figcaption>
            <div className="row">
              <div className="columns small-centered medium-6">
                <div className="caption-text">
                  Borehole specialists in cable percussion drilling We provide
                  consistent professional expertise and experience for your
                  exact site investigation projects
                </div>
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
      <div className="row">
        <div className="columns">
          <MDXRemote {...mdxSource} />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const indexPage = await getPage()
  const [contents, fields] = await getPage("index-page");
  const mdxSource = await serialize(contents);

  return {
    props: {
      mdxSource,
    },
  };
};
