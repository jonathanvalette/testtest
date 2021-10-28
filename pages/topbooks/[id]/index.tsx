import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/topbook/Show";
import { TopBook } from "../../../types/TopBook";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  topbook: TopBook;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  topbook,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show TopBook ${topbook["@id"]}`}</title>
        </Head>
      </div>
      <Show topbook={topbook} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const topbook = await fetch(asPath);

  return { topbook };
};

export default Page;
