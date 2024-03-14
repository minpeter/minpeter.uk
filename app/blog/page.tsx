import Link from "next/link";
import { getAllPosts } from "@/lib/loader";
import Header from "@/components/header";
import { cn, formatDate, formatYear } from "@/lib/utils";

export default function Page() {
  const posts = getAllPosts();

  const itemSytles =
    "rounded-md group-hover/post:bg-secondary/100 group-hover/post:!opacity-100 group-hover/list:opacity-60";

  const yearList = posts.reduce((acc: any, post) => {
    const year = formatYear(post.frontmatter.date);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  return (
    <section>
      <Header title="블로그" description="블로그 글 목록." />
      <div data-animate data-animate-speed="slow" className="group/list">
        {yearList &&
          Object.keys(yearList)
            .reverse()
            .map((year) => (
              <div
                key={year}
                className="group/year flex border-t last-of-type:border-b border-gray-600 py-8"
              >
                <div className="w-24">
                  <h2 className="w-fit px-2 rounded-md text-gray-400 group-hover/year:bg-secondary/100 group-hover/year:!opacity-100">
                    {year}
                  </h2>
                </div>
                {
                  <ul
                    data-animate
                    data-animate-speed="fast"
                    className="space-y-3 w-full"
                  >
                    {yearList[year].map((post: any) => (
                      <li
                        key={post.id}
                        className="flex justify-between group/post space-x-4"
                      >
                        <Link href={`/blog/${post.id}`}>
                          <span
                            className={cn(
                              itemSytles,
                              "inline py-1 px-2 box-decoration-clone"
                            )}
                          >
                            {post.frontmatter.title}
                          </span>
                        </Link>

                        <time
                          dateTime={post.frontmatter.date}
                          className={cn(itemSytles, "text-nowrap h-fit")}
                        >
                          {formatDate(post.frontmatter.date)}
                        </time>
                      </li>
                    ))}
                  </ul>
                }
              </div>
            ))}
      </div>
    </section>
  );
}
