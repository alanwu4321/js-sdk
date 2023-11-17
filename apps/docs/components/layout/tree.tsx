import { FC } from "react";
import { TreeNode } from "./node";
import * as Accordion from "@radix-ui/react-accordion";
import { useRouter } from "next/router";

export const TreeView: FC<{ data: any }> = (props) => {
  const { data } = props;
  const router = useRouter();
  const { locale, query } = router;

  const defaultValue = (query.module as string)?.replace(
    `.${locale}` || "",
    ""
  );
  console.log(router, query, defaultValue);
  //   console.log(data);
  return (
    <div className="space-y-2">
      <Accordion.Root
        type="single"
        collapsible={false}
        defaultValue={defaultValue}
      >
        {data.map((item) => {
          console.log(item.slug);
          return (
            <Accordion.Item key={item.id} value={item.slug}>
              <TreeNode
                name={item.name}
                children={item.children}
                slug={item.slug}
              />
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
};
