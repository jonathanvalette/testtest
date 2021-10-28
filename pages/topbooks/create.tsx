import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/topbook/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create TopBook </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
