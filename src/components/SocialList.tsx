import React from "react";
import CodePen from "../assets/codepen-alt.svg";
import GitHub from "../assets/github-alt.svg";
import config from "../lib/config";

export function SocialList({}) {
  return (
    <div>
      <a
        title="GitHub"
        href={`https://github.com/${config.github_account}`}
        target="_blank"
        rel="noopener"
      >
        <GitHub width={24} height={24} fill={"#222"} />
      </a>
      <a
        title="CodePen"
        href={`https://codepen.com/${config.codepen_account}`}
        target="_blank"
        rel="noopener"
      >
        <CodePen width={24} height={24} stroke={"#222"} fill={"none"} />
      </a>
      <style jsx>{`
        a {
          display: inline-block;
        }
        a:not(:last-child) {
          margin-right: 2em;
        }
      `}</style>
    </div>
  );
}
