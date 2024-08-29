import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const catArray = [
  { name: 'Men’s Collection', image: '/men.jpeg' },
  { name: 'Women’s Collection', image: '/women.jpeg' },
  { name: 'Kids Collection', image: '/kids2.jpeg' },
];

const navsvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M18.0001 5C18.2653 5 18.5196 5.10536 18.7072 5.29289C18.8947 5.48043 19.0001 5.73478 19.0001 6V14C19.0001 14.2652 18.8947 14.5196 18.7072 14.7071C18.5196 14.8946 18.2653 15 18.0001 15C17.7348 15 17.4805 14.8946 17.293 14.7071C17.1054 14.5196 17.0001 14.2652 17.0001 14V8.414L7.05006 18.364C6.86146 18.5462 6.60885 18.647 6.34666 18.6447C6.08446 18.6424 5.83365 18.5372 5.64824 18.3518C5.46283 18.1664 5.35766 17.9156 5.35538 17.6534C5.35311 17.3912 5.4539 17.1386 5.63606 16.95L15.5861 7H10.0001C9.73484 7 9.48049 6.89464 9.29295 6.70711C9.10542 6.51957 9.00006 6.26522 9.00006 6C9.00006 5.73478 9.10542 5.48043 9.29295 5.29289C9.48049 5.10536 9.73484 5 10.0001 5H18.0001Z"
      fill="white"
    />
  </svg>
);
const SectionOne = () => {
  return (
    <div className="container mx-auto mt-10 md:mb-24 mb-14">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <Link href="/categoryProduct/1" className="relative">
          <div className="h-[250px] sm:h-[416px] md:h-[580px] rounded-lg overflow-hidden">
            <Image
              src={catArray[0].image}
              alt={`Lathz ${catArray[0].name}`}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 w-full px-2 sm:px-4 py-2 sm:my-4">
            <div className="bg-white text-black px-2 sm:px-6 py-2 sm:py-4 rounded-lg text-[10px] sm:text-[14px] lg:text-[18px] flex justify-between items-center">
              <h1>{catArray[0].name}</h1>
              <div className="rounded-full bg-black w-[26px] sm:w-[30px] md:w-[46px] h-[26px] sm:h-[30px] md:h-[46px] flex items-center justify-center">
                {navsvg}
              </div>
            </div>
          </div>
        </Link>
        <Link href="/categoryProduct/2" className="relative">
          <div className="h-[250px] sm:h-[416px] md:h-[580px] rounded-lg overflow-hidden">
            <Image
              src={catArray[1].image}
              alt={`Lathz ${catArray[1].name}`}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 w-full px-2 sm:px-4 py-2 sm:my-4">
            <div className="bg-white text-black px-2 sm:px-6 py-2 sm:py-4 rounded-lg text-[10px] sm:text-[14px] lg:text-[18px] flex justify-between items-center">
              <h1> {catArray[1].name}</h1>
              <div className="rounded-full bg-black w-[26px] sm:w-[30px] md:w-[46px] h-[26px] sm:h-[30px] md:h-[46px] flex items-center justify-center">
                {navsvg}
              </div>
            </div>
          </div>
        </Link>
        <Link href='/categoryProduct/3' className="relative col-span-2 md:col-span-1">
          <div className="h-[250px] sm:h-[416px] md:h-[580px] rounded-lg overflow-hidden">
            <Image
              src={catArray[2].image}
              alt={`Lathz ${catArray[2].name}`}
              width={1000}
              height={1000}
              className="w-full h-full object-cover md:object-[15%_50%]"
            />
          </div>
          <div className="absolute bottom-0 w-full px-2 sm:px-4 py-2 sm:my-4 hidden sm:block">
            <div className="bg-white text-black px-2 sm:px-6 py-2 sm:py-4 rounded-lg text-[12px] sm:text-[14px] lg:text-[18px]">
              <h1 className="text-2xl"> {catArray[2].name} </h1>
              <div className="flex gap-4 mt-4">
                <button className="px-[32px] py-[12px] bg-black rounded-lg text-white">
                  Boys
                </button>
                <button className="px-[32px] py-[12px] bg-[#E6E6E8] rounded-lg">
                  Girls
                </button>
              </div>
            </div>
          </div>
          <div className="absolute right-0 w-1/2 px-2 sm:px-4 py-2 sm:my-4 flex sm:hidden top-0 h-full items-center">
            <div className="bg-white text-black px-2 sm:px-6 py-2 sm:py-4 rounded-lg text-[12px] sm:text-[14px] lg:text-[18px] w-full">
              <h1 className="text-[16px] sm:text-2xl text-center">
                {' '}
                {catArray[2].name}{' '}
              </h1>
              <div className="flex gap-2 mt-2 flex-col">
                <button className="text-[10px]  px-[32px] py-[12px] bg-black rounded-lg text-white">
                  Boys
                </button>
                <button className="text-[10px]  px-[32px] py-[12px] bg-[#E6E6E8] rounded-lg">
                  Girls
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SectionOne;
