import Header from "@/components/header";
import { Suspense } from "react";
import { BlogList } from "./list";

export default async function Page({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  return (
    <section>
      <Header
        title="민웅기의 개발 노트"
        description="내가 만든 블로그, 너를 위해 써봤지"
        link={{ href: "/", text: "홈으로" }}
      />
      <Suspense>
        <BlogList lang={lang} />
      </Suspense>
    </section>
  );
}
