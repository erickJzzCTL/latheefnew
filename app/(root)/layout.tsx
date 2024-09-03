'use client'


import Footer from '@/components/shared/footer/Footer';
import Header from '@/components/shared/Header';
import axios from '../../utilities/customaxios';
import useStore from '@/store/store';
import { useEffect } from 'react';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { homeData, setHomeData } = useStore((state) => ({
    homeData: state.homeData,
    setHomeData: state.setHomeData
  }));

  useEffect(() => {
    const getHomeDetails = async () => {
      const response = await axios.get('api/homepage')
      setHomeData(response.data)
      console.log(response.data);
      
    }
    getHomeDetails()
  },[])
  
  // useEffect(()=>{getHomeDetails(),[]})
  return (
    <>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
}
