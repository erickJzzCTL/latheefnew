'use client';

import SectionOne from '@/components/shared/homeScreens/SectionOne';
import SubHeader from '@/components/shared/SubHeader';
import SectionTwo from '@/components/shared/homeScreens/SectionTwo';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const getTokenFromCookies = () => {
      const cookieString = document.cookie
        .split('; ')
        .find(row => row.startsWith('guestToken='));
      return cookieString ? cookieString.split('=')[1] : null;
    };

    const token = getTokenFromCookies();
    if (!token) {
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
