import Image from "next/image";
import signupimage from "../../../../assets/signup/loginsuccess.jpeg";
import Link from "next/link";

const loginSuccess = () => {
  return (
    <div className="container mx-auto mb-10 sm:mb-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-8">
        <div className="h-[60vh]  sm:h-[100vh] mt-6 sm:mt-0 rounded-xl sm:rounded-none overflow-hidden">
          <Image
            src={signupimage}
            alt="lathif login success banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex  flex-col sm:justify-center gap-6">
          <h1 className="text-2xl font-semibold mt-4">Congratulations!</h1>
          <p className="text-md font-light text-[#484848]">
            Your luxurious watch account has
            <br /> been created successfully!{" "}
          </p>
          <Link href="/login">
            <button className="bg-black text-white rounded-lg h-[50px] w-full">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default loginSuccess;
