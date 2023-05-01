import * as api from "@hacker-news/core/api";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

export default function Home({ items }: { items: api.Item[] }) {
  return (
    <>
      <nav className="px-8 py-2 bg-[#ff6600]">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-5 h-5 border border-white p-1">
            <Image src="/y18.gif" alt="Hacker News Logo" fill={true} />
          </div>
          <div className="font-bold">Hacker News</div>
        </Link>
      </nav>
      <main>
        <div className="px-8 py-4 bg-[#f6f6ef]">
          <ol className="list-decimal list-outside px-4 py-2 space-y-4">
            {items.map((item, idx) => (
              <li key={idx} className="text-sm text-slate-800 font-semibold">
                <div>
                  <div>
                    <a href={item.url} className="hover:underline">
                      {item.title}
                    </a>
                    <span className="text-xs text-slate-500">
                      {` (${hostName(item.url)})`}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    <span>{`${item.score} points by ${item.by}`}</span>
                    <span>{" | "}</span>
                    <a
                      href={`https://news.ycombinator.com/item?id=${item.id}`}
                      className="hover:underline"
                    >{`${item.descendants ?? 0} comments`}</a>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  const items = await api.topStories({ top: 30 });

  items.sort((a, b) => b.score - a.score);

  return {
    props: {
      items,
    },
  };
}

function hostName(url: string) {
  const u = new URL(url);

  if (u.hostname.startsWith("www.")) {
    return u.hostname.substring(4);
  }

  return u.hostname;
}
