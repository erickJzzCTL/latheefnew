'use client';

import SectionOne from '@/components/shared/homeScreens/SectionOne';
import SubHeader from '@/components/shared/SubHeader';
import SectionTwo from '@/components/shared/homeScreens/SectionTwo';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authToken } from '@/utilities';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!authToken()) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <div>
      <SubHeader />
      <SectionOne />
      <SectionTwo />
    </div>
  );
}