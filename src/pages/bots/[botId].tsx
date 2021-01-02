import { NextPage, GetServerSideProps } from "next";
import axios from "axios";
import Bot from "../../interfaces/Bot";

interface Props {
  bot: Bot;
}

const BotPage: NextPage<Props> = () => {
  return <div>Hello from bots/</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  axios.get("");

  return {
    props: {
      bot: {},
    },
  };
};

export default BotPage;
