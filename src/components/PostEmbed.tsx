//import fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
  mdx: string;
};

export default function PostEmbed({ mdx }: Props) {
   // const fs = require('fs');
    //const source = fs.readFileSync(path);
  return (

      {mdx}

  );
}

export const getStaticProps: GetStaticProps = async (props) => {
    //const folderPath = path.join(process.cwd(), "content");
    //const filePath = path.join(folderPath, `${props.params.post}.mdx`);
    const source = fs.readFileSync('../content/posts/license.mdx');

    return {
        props: {
        mdx: source.toString(),
        },
    };
};