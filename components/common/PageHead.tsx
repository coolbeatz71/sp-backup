import { FC } from "react";
import Head from "next/head";
import { IUnknownObject } from "interfaces/unknownObject";
import getPlatformUrl from "helpers/getPlatformUrl";

export interface PageHeadProps {
  data: IUnknownObject;
}

const PageHead: FC<PageHeadProps> = ({ data }) => {
  return (
    <Head>
      <title>{data.name}</title>
      <meta property="og:type" content="website" />
      <meta property="description" content={data.description} />
      <meta property="og:title" content={data.name} />
      <meta property="description" content={data.summary} name="description" />
      <meta
        property="og:url"
        content={`${getPlatformUrl()}/causes/${data.slug}`}
      />
      <meta property="og:description" content={data.summary} />
      <meta property="og:image" content={data.image} />

      <meta name="twitter:title" content={data.name} />
      <meta name="twitter:description" content={data.summary} />
      <meta name="twitter:image" content={data.image} />
      <meta name="twitter:card" content={data.image} />
    </Head>
  );
};

export default PageHead;
