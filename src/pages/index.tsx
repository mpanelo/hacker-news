import Image from "next/image";
import Link from "next/link";
import prisma from "../lib/prisma";
import { Story } from "@hacker-news/components/Story";
import * as types from "@hacker-news/core/types";

interface Props {
  stories: types.Story[];
}

export default function Home({ stories }: Props) {
  console.log(stories[0]);
  return (
    <>
      <nav className="px-8 py-2 bg-[#ff6600]">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-5 h-5 border border-white p-1">
            <Image src="/y18.svg" alt="Hacker News Logo" fill={true} />
          </div>
          <div className="font-bold">Hacker News</div>
        </Link>
      </nav>
      <main>
        <div className="px-8 py-4 bg-[#f6f6ef]">
          <ol className="list-decimal list-outside px-4 py-2 space-y-4">
            {stories.map((story, idx) => (
              <li key={idx} className="text-sm text-slate-800 font-semibold">
                <Story story={story} />
              </li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  let stories = await prisma.stories.findMany();

  stories = JSON.parse(JSON.stringify(stories));

  return {
    props: { stories },
  };
}
