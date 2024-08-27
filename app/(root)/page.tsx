import SectionOne from '@/components/shared/homeScreens/SectionOne';
import SubHeader from '@/components/shared/SubHeader';
import SectionTwo from '@/components/shared/homeScreens/SectionTwo';
import React from 'react';

export default function Home() {
  return (
    <div>
      <SubHeader />
      <SectionOne />
      <SectionTwo />
    </div>
  );
}
