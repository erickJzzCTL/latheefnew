'use client';

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import SectionOne from '@/components/shared/homeScreens/SectionOne';
import SubHeader from '@/components/shared/SubHeader';
import SectionTwo from '@/components/shared/homeScreens/SectionTwo';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   if()
  // },[])
  return (
    <div>
      <SubHeader />
      <SectionOne />
      <SectionTwo />
    </div>
  );
}
