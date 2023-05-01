import { get } from "@hackernews/core/http";

const hackernewsUrl = "https://hacker-news.firebaseio.com/v0";

type ItemId = number;

export interface Item {
  id: ItemId;
  title: string;
  score: number;
  url: string;
  by: string;
  time: number;
  kids: number[];
  descendants?: number;
}

export async function topStories({ top }: { top: number }) {
  const { data } = await get<ItemId[]>({
    url: `${hackernewsUrl}/topstories.json`,
  });

  const itemIds = data.slice(0, top);

  const items: Item[] = [];
  for (const id of itemIds) {
    const { data } = await item(id);
    items.push(data);
  }

  return items;
}

export function item(id: number) {
  return get<Item>({ url: `${hackernewsUrl}/item/${id}.json` });
}
