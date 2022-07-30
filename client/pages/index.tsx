import type { NextPage } from "next";
import HomeNav from "../components/nav/HomeNav";
import { SVG_TRIANGLE_PATH } from "../utils/resources.utils";

const Home: NextPage = () => {
  return (
    <div
      className="relative w-screen h-screen bg-cover"
      style={{
        backgroundImage: `url('${SVG_TRIANGLE_PATH}')`,
      }}
    >
      <HomeNav />
    </div>
  );
};

export default Home;
