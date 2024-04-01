"use client";

import { useMemo } from "react";
import Image from "next/image";

import { codeVariants } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import copy from "clipboard-copy";
import { highlight } from "sugar-high";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getMDXComponent } from "mdx-bundler/client";

export default function PostContent({ code }: any) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <Component
      components={{
        table: (props: any) => <Table {...props} />, // "w-full" is not a valid class name
        th: (props: any) => <TableHead {...props} />,
        td: (props: any) => <TableCell {...props} />,
        tbody: (props: any) => <TableBody {...props} />,
        thead: (props: any) => <TableHeader {...props} />,
        tr: (props: any) => <TableRow {...props} />,
        img: (props: any) => (
          <Image width={500} height={1} src={props.src} alt={props.alt} />
        ),

        code: ({ children }: any) => {
          const isMultiline = children.includes("\n");

          return (
            <code
              onClick={() => {
                handleCopyClick(children);
              }}
              className={isMultiline ? "" : cn(codeVariants(), "break-all")}
              dangerouslySetInnerHTML={{
                __html: isMultiline ? highlight(children) : children,
              }}
            />
          );
        },
      }}
    />
  );
}

async function handleCopyClick(content: string) {
  try {
    await copy(content);
  } catch (error) {
    console.error("Failed to copy text to clipboard", error);
  }
}
