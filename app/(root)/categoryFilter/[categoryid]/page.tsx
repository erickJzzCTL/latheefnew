import ProductsList from "@/components/shared/ProductsList";
import SidePanel from "@/components/shared/SidePanel";
import SubHeader from "@/components/shared/SubHeader";
import React from "react";

export default function categoryFilter() {
  return (
    <>
      <SubHeader />
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 md:gap-6 md:mt-10 mt-5">
          <SidePanel />
          <div className="col-span-3">
            <ProductsList />
          </div>
        </div>
      </div>
    </>
  );
}
