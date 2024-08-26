import ProductsList from "@/components/shared/ProductsList";
import SidePanel from "@/components/shared/SidePanel";
import SubHeader from "@/components/shared/SubHeader";
import React from "react";

export default function Products() {
  return (
    <>
      <SubHeader />
      <div className="grid grid-cols-4 md:gap-6 mt-10">
        <SidePanel />
        <div className="col-span-3">
          <ProductsList />
        </div>
      </div>
    </>
  );
}
