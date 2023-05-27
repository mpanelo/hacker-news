import Image from "next/image";
import Link from "next/link";
import prisma from "../lib/prisma";
import { Story } from "@hacker-news/components/Story";
import * as types from "@hacker-news/core/types";
import SortMenu, { SortMethod } from "@hacker-news/components/SortMenu";
import { useState } from "react";

interface Props {
  stories: types.Story[];
}

export default function Home({ stories }: Props) {
  const [items, setItems] = useState([...stories]);

  const onSortHandler = (sortMethod: SortMethod) => {
    if (sortMethod === SortMethod.Points) {
      items.sort((a, b) => {
        return a.score - b.score;
      });
    } else if (sortMethod === SortMethod.Time) {
      items.sort((a, b) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      });
    } else if (sortMethod === SortMethod.Comments) {
      items.sort((a, b) => {
        return a.descendants - b.descendants;
      });
    }

    items.reverse();

    setItems([...items]);
  };

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
        <div className="flex flex-col space-y-2 px-8 py-4 bg-[#f6f6ef]">
          <SortMenu onClick={onSortHandler} />
          <ol className="list-decimal list-outside px-4 py-2 space-y-4">
            {items.map((item, idx) => (
              <li key={idx} className="text-sm text-slate-800 font-semibold">
                <Story story={item} />
              </li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const dbStories = await prisma.stories.findMany();

  const stories = JSON.parse(JSON.stringify(dbStories));

  return {
    props: { stories },
  };
}
