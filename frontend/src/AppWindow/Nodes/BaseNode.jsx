import { memo } from "react";

import { BaseNode } from "@/components/base-node";

const BaseNodeDemo = memo(({ selected }) => {
  return (
    <BaseNode selected={selected}>
      <div className="text-center text-red-500">Base Node</div>
    </BaseNode>
  );
});

export default BaseNodeDemo;
