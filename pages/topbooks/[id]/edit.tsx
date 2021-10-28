import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/topbook/Form";
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
          <title>{topbook && `Edit TopBook ${topbook["@id"]}`}</title>
        </Head>
      </div>
      <Form topbook={topbook} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const topbook = await fetch(asPath.replace("/edit", ""));

  return { topbook };
};

export default Page;
