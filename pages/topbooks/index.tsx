import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/topbook/List";
import { PagedCollection } from "../../types/Collection";
import { TopBook } from "../../types/TopBook";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<TopBook>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>TopBook List</title>
      </Head>
    </div>
    <List top_books={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/top_books");

  return { collection };
};

export default Page;
