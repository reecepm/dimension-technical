import { type NextPage } from "next";
import Head from "next/head";
import NewTaskDialog from "@/components/task/NewTaskDialog";
import FrontendIcon from "@/icons/Frontend";
import { api } from "@/utils/api";
import Tags from "@/components/data/Tags";
import Projects from "@/components/data/Projects";
import Statuses from "@/components/data/Statuses";
import Users from "@/components/data/Users";
import { useState } from "react";
import { Button } from "@/components/ui";

const Home: NextPage = () => {
  const [dataShow, setDataShow] = useState(false);

  return (
    <>
      <Head>
        <title>Dimension Technical Test</title>
        <meta name="description" content="Reece dimension technical test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-center text-4xl  font-bold text-gray-900">
          Reece Dimension Technical Test
        </h1>
        <div className="max-w-lg space-y-4 text-xs text-gray-500">
          <h5 className="text-sm font-medium">Some things to note:</h5>
          <ul className="list-disc space-y-2">
            <li>
              the font is a <i>little</i> off - I didn't want to pay the $720
              license so used a dodgy one from online, which i believe is
              affecting width slightly (antialiasing on and text-spacing
              altered, still too wide)
            </li>

            <li>
              the font weight of the "description" box and the placeholder /
              value on the selects is different on the base and the AI version
              in figma - I used the lighter one as it's then consistent with the
              AI recommendations, but can of course change it if that was a
              mistake
            </li>
          </ul>
        </div>
        <NewTaskDialog
          team={{
            name: "Frontend",
            icon: <FrontendIcon className="h-4 w-4" />,
          }}
        />
        <Button onClick={() => setDataShow(!dataShow)}>
          {dataShow ? "Hide Data" : "Play With Data"}
        </Button>
        {dataShow && (
          <div className="grid w-full grid-cols-4 gap-8">
            <Tags />
            <Projects />
            <Statuses />
            <Users />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
