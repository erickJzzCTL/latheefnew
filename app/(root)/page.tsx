'use client';

import SectionOne from '@/components/shared/homeScreens/SectionOne';
import SubHeader from '@/components/shared/SubHeader';
import SectionTwo from '@/components/shared/homeScreens/SectionTwo';
import React from 'react'; 
import { authToken } from '@/utilities';
import { useRouter } from 'next/navigation';
export default function Home() {
 const token = authToken()
 const router = useRouter()
 if (!token){
  router.push('/signin')
 }
  return (
    <div>
      <SubHeader />
      <SectionOne />
      <SectionTwo />
    </div>
  );
}