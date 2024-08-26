import SubHeader from "@/components/shared/SubHeader";
import React from "react";

export default function Products() {
  return (
    <>
      <SubHeader />
      <div className="grid grid-cols-3">
        <div>Side Panel</div>
        <div>Product Section 1</div>
        <div>Product Section 2</div>
      </div>
    </>
  );
}
