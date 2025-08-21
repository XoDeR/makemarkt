"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const categories = useQuery(trpc.categories.getMany.queryOptions());


  return (
    <div className="p-4">
      <div>
        {/* {JSON.stringify(categories.data, null, 2)} */}
      </div>
      <div className="flex flex-col gap-y-4">
        <div>
          <Button variant="elevated">
            Button
          </Button>
        </div>
        <div>
          <Input placeholder="Input" />
        </div>
        <div>
          <Progress value={50} />
        </div>
        <div>
          <Textarea placeholder="Textarea" />
        </div>
        <div>
          <Checkbox />
        </div>
      </div>
    </div>
  );
}
