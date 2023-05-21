import * as types from "@hacker-news/core/types";

interface Props {
  story: types.Story;
}

export function Story({ story }: Props) {
  return (
    <div>
      <div>
        <a href={story.url} className="hover:underline">
          {story.title}
        </a>
        <span className="text-xs text-slate-500">
          {` (${hostName(story.url)})`}
        </span>
        <Subheader story={story} />
      </div>
    </div>
  );
}

function Subheader({ story }: Props) {
  const commentsURL = `https://news.ycombinator.com/item?id=${story.id}`;
  const date = Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(story.time));

  return (
    <div className="flex flex-row text-xs text-slate-500">
      <span>{`${story.score} points by ${story.by} on ${date}`}</span>
      <span className="mx-1">|</span>
      <a href={commentsURL} className="hover:underline">
        {`${story.descendants} comments`}
      </a>
    </div>
  );
}

function hostName(url: string) {
  if (url === "") {
    return "";
  }
  const u = new URL(url);

  if (u.hostname.startsWith("www.")) {
    return u.hostname.substring(4);
  }

  return u.hostname;
}
