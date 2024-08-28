'use client';

'use client';

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import SectionOne from '@/components/shared/homeScreens/SectionOne';
import SubHeader from '@/components/shared/SubHeader';
import SectionTwo from '@/components/shared/homeScreens/SectionTwo';
import { authToken } from '@/utilities';
import { useRouter } from 'next/navigation';

export default function Home() {
 const token = authToken()
 const router = useRouter()
 if (!token){
  router.push('/signin')
 }
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