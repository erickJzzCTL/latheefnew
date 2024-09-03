'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';

import img1 from '../../../../assets/products/img1.png';
import { useProduct } from '@/hooks/useProduct';
import { useAddToWishlist } from '@/hooks/useAddToWishlist';
import { useAddToCart } from '@/hooks/useAddToCart';
import useStore from '@/store/store';
import userValidate from '@/utilities/userValidate';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string; // Type-cast to string, since useParams returns string | undefined

  const { data, isLoading, isError, error } = useProduct(productId);

  const addToWishlistMutation = useAddToWishlist();
  const handleAddToWishlist = (productId: number) => {
    addToWishlistMutation.mutate(productId, {
      onSuccess: data => {
        // Show a success message to the user
        alert(data.message);
      },
    });
  };

  const addToCartMutation = useAddToCart();

  const [isModalOpen, setIsModalOpen] = useStore(
    state =>
      [state.isModalOpen, state.setIsModalOpen] as [
        boolean,
        (open: boolean) => void
      ]
  );

  const handleAddToCart = (productId: number) => {
    addToCartMutation.mutate(
      { product_id: productId, quantity: 1 },
      {
        onSuccess: data => {
          alert(data.message);
        },
      }
    );
  };

  const handleDownloadImage = (imageUrl: string) => {
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `product-${productId}.png`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => {
        console.error('Error downloading image:', err);
        alert('Error downloading image. Please try again later.');
      });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        url: window.location.href,
      });
    } else {
      // Fallback to clipboard copy
      navigator.clipboard.writeText(window.location.href).then(
        () => {
          alert('Product link copied to clipboard!');
        },
        err => {
          console.error('Failed to copy product link to clipboard:', err);
          alert('Failed to copy product link to clipboard.');
        }
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No product found.</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex md:flex-row flex-col gap-4 mt-12 mb-12">
        <div className="rounded-[20px] overflow-hidden h-full w-full">
          <Image
            src={data?.image} // Use the image from API or fallback
            alt={`Product ${productId}`}
            className="w-full h-full object-cover"
            width={1000} // Set width and height based on your needs
            height={1000}
          />
        </div>
        <div className="bg-black px-4 md:py-10 py-4 md:h-[70vh] rounded-[20px] flex md:flex-col flex-row justify-between">
          {/* Download */}
          <div
            onClick={() => handleDownloadImage(data.image)}
            className="w-14 h-14 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="54"
              viewBox="0 0 81 80"
              className="group"
            >
              <circle
                cx="40.5"
                cy="40"
                r="40"
                className="fill-[#5b5b5b] group-hover:fill-white transition-colors duration-300"
              />
              <mask
                id="mask0_296_110"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="20"
                y="20"
                width="41"
                height="41"
              >
                <rect x="20.5" y="20" width="40" height="40" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_296_110)">
                <path
                  d="M40.5 46.3142L33.3846 39.1987L35.1413 37.3913L39.25 41.5V27.5H41.75V41.5L45.8587 37.3913L47.6154 39.1987L40.5 46.3142ZM31.0129 52.5C30.171 52.5 29.4583 52.2083 28.875 51.625C28.2917 51.0417 28 50.329 28 49.4871V44.9679H30.5V49.4871C30.5 49.6154 30.5535 49.7329 30.6604 49.8396C30.7671 49.9465 30.8846 50 31.0129 50H49.9871C50.1154 50 50.2329 49.9465 50.3396 49.8396C50.4465 49.7329 50.5 49.6154 50.5 49.4871V44.9679H53V49.4871C53 50.329 52.7083 51.0417 52.125 51.625C51.5417 52.2083 50.829 52.5 49.9871 52.5H31.0129Z"
                  className="fill-white group-hover:fill-black transition-colors duration-300"
                />
              </g>
            </svg>
          </div>

          {/* Wish */}
          <div
            onClick={() => {
              userValidate()
                ? handleAddToWishlist(data.id)
                : setIsModalOpen(true);
            }}
            className="w-14 h-14 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="54"
              viewBox="0 0 81 81"
              className="group"
            >
              <circle
                cx="40.5"
                cy="40.3335"
                r="40"
                className="fill-[#5B5B5B] group-hover:fill-white transition-colors duration-300"
              />
              <mask
                id="mask0_296_115"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="20"
                y="20"
                width="41"
                height="41"
              >
                <rect
                  x="20.5"
                  y="20.3335"
                  width="40"
                  height="40"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_296_115)">
                <path
                  d="M40.5003 54.2114L38.6607 52.5577C35.898 50.0513 33.6132 47.8975 31.8066 46.0964C29.9999 44.295 28.5682 42.6918 27.5116 41.2868C26.4549 39.8821 25.7167 38.6006 25.297 37.4422C24.877 36.2842 24.667 35.1091 24.667 33.9168C24.667 31.5516 25.4645 29.5713 27.0595 27.976C28.6548 26.381 30.635 25.5835 33.0003 25.5835C34.4553 25.5835 35.8303 25.9238 37.1253 26.6043C38.4203 27.2849 39.5453 28.2609 40.5003 29.5322C41.4553 28.2609 42.5803 27.2849 43.8753 26.6043C45.1703 25.9238 46.5453 25.5835 48.0003 25.5835C50.3656 25.5835 52.3459 26.381 53.9412 27.976C55.5362 29.5713 56.3337 31.5516 56.3337 33.9168C56.3337 35.1091 56.1237 36.2842 55.7037 37.4422C55.2839 38.6006 54.5457 39.8821 53.4891 41.2868C52.4324 42.6918 51.0034 44.295 49.202 46.0964C47.4009 47.8975 45.1135 50.0513 42.3399 52.5577L40.5003 54.2114ZM40.5003 50.8335C43.167 48.4341 45.3614 46.3774 47.0837 44.6635C48.8059 42.9499 50.167 41.4611 51.167 40.1972C52.167 38.9334 52.8614 37.811 53.2503 36.8302C53.6392 35.8496 53.8337 34.8785 53.8337 33.9168C53.8337 32.2502 53.2781 30.8613 52.167 29.7502C51.0559 28.6391 49.667 28.0835 48.0003 28.0835C46.6842 28.0835 45.4678 28.4568 44.3512 29.2035C43.2348 29.9504 42.3507 30.9895 41.6991 32.3206H39.3016C38.6391 30.9786 37.7523 29.937 36.6412 29.1956C35.53 28.4542 34.3164 28.0835 33.0003 28.0835C31.3442 28.0835 29.958 28.6391 28.8416 29.7502C27.7252 30.8613 27.167 32.2502 27.167 33.9168C27.167 34.8785 27.3614 35.8496 27.7503 36.8302C28.1392 37.811 28.8337 38.9334 29.8337 40.1972C30.8337 41.4611 32.1948 42.9472 33.917 44.6556C35.6392 46.3639 37.8337 48.4232 40.5003 50.8335Z"
                  className="fill-white group-hover:fill-black transition-colors duration-300"
                />
              </g>
            </svg>
          </div>

          {/* Cart */}
          <div
            onClick={() => {
              userValidate() ? handleAddToCart(data.id) : setIsModalOpen(true);
            }}
            className="w-14 h-14 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="54"
              viewBox="0 0 81 81"
              className="group"
            >
              {/* Background Circle */}
              <circle
                cx="40.5"
                cy="40.6665"
                r="40"
                className="fill-[#5B5B5B] group-hover:fill-white transition-colors duration-300"
              />

              {/* Mask and Path */}
              <mask
                id="mask0_296_120"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="20"
                y="21"
                width="41"
                height="41"
              >
                <rect
                  x="20.5"
                  y="21.2915"
                  width="40"
                  height="40"
                  fill="#D9D9D9"
                />
              </mask>
              <g mask="url(#mask0_296_120)">
                <path
                  d="M32.4229 57.2211C31.6132 57.2211 30.9247 56.9373 30.3575 56.3698C29.7903 55.8026 29.5067 55.1141 29.5067 54.3044C29.5067 53.4944 29.7903 52.8058 30.3575 52.2386C30.9247 51.6714 31.6132 51.3878 32.4229 51.3878C33.2329 51.3878 33.9215 51.6714 34.4888 52.2386C35.056 52.8058 35.3396 53.4944 35.3396 54.3044C35.3396 55.1141 35.056 55.8026 34.4888 56.3698C33.9215 56.9373 33.2329 57.2211 32.4229 57.2211ZM48.5771 57.2211C47.7671 57.2211 47.0785 56.9373 46.5113 56.3698C45.944 55.8026 45.6604 55.1141 45.6604 54.3044C45.6604 53.4944 45.944 52.8058 46.5113 52.2386C47.0785 51.6714 47.7671 51.3878 48.5771 51.3878C49.3868 51.3878 50.0753 51.6714 50.6425 52.2386C51.2097 52.8058 51.4933 53.4944 51.4933 54.3044C51.4933 55.1141 51.2097 55.8026 50.6425 56.3698C50.0753 56.9373 49.3868 57.2211 48.5771 57.2211ZM29.3271 28.3748H52.4679C53.1496 28.3748 53.665 28.665 54.0142 29.2453C54.3636 29.8253 54.3803 30.4176 54.0642 31.0223L48.7242 40.6953C48.4508 41.1761 48.0893 41.5505 47.6396 41.8186C47.1896 42.0869 46.6965 42.2211 46.1604 42.2211H34L32.0704 45.7465C31.9849 45.8748 31.9822 46.0137 32.0625 46.1632C32.1425 46.3129 32.2626 46.3878 32.4229 46.3878H51.4933V48.8878H32.4229C31.3118 48.8878 30.4769 48.4086 29.9183 47.4503C29.3594 46.4919 29.3397 45.5351 29.8592 44.5798L32.2371 40.3044L26.1733 27.5415H23V25.0415H27.7438L29.3271 28.3748Z"
                  className="fill-white group-hover:fill-black transition-colors duration-300"
                />
              </g>
            </svg>
          </div>

          {/* Share */}
          <div onClick={handleShare} className="w-14 h-14 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="54"
              viewBox="0 0 81 80"
              className="group"
            >
              <circle
                cx="40.5"
                cy="40"
                r="40"
                className="group-hover:fill-white fill-[#5D5D5D] transition-colors duration-300"
              />
              <mask
                id="mask0_296_125"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="20"
                y="20"
                width="41"
                height="41"
              >
                <rect x="20.5" y="20.625" width="40" height="40" fill="white" />
              </mask>
              <g mask="url(#mask0_296_125)">
                <path
                  d="M48.5095 56.4582C47.262 56.4582 46.2028 56.0219 45.332 55.1494C44.4614 54.2769 44.0262 53.2175 44.0262 51.9711C44.0262 51.8044 44.0838 51.3994 44.1991 50.7561L32.3466 43.7786C31.9449 44.1953 31.4677 44.5216 30.9149 44.7578C30.3621 44.9939 29.7699 45.1119 29.1382 45.1119C27.8963 45.1119 26.8406 44.6739 25.9712 43.7978C25.1017 42.9216 24.667 41.864 24.667 40.6248C24.667 39.3857 25.1017 38.328 25.9712 37.4519C26.8406 36.5758 27.8963 36.1378 29.1382 36.1378C29.7699 36.1378 30.3621 36.2558 30.9149 36.4919C31.4677 36.728 31.9449 37.0544 32.3466 37.4711L44.1991 30.5094C44.133 30.3044 44.0875 30.1036 44.0628 29.9069C44.0384 29.7103 44.0262 29.5008 44.0262 29.2786C44.0262 28.0322 44.4627 26.9728 45.3357 26.1003C46.2091 25.2278 47.2695 24.7915 48.517 24.7915C49.7645 24.7915 50.8235 25.2282 51.6941 26.1015C52.5649 26.9746 53.0003 28.0348 53.0003 29.2823C53.0003 30.5298 52.5641 31.589 51.6916 32.4598C50.8191 33.3304 49.7596 33.7657 48.5132 33.7657C47.8785 33.7657 47.2882 33.645 46.7424 33.4036C46.1963 33.1622 45.7224 32.8332 45.3207 32.4165L33.4682 39.394C33.5344 39.5993 33.5798 39.8001 33.6045 39.9965C33.6289 40.1932 33.6412 40.4026 33.6412 40.6248C33.6412 40.8471 33.6289 41.0565 33.6045 41.2532C33.5798 41.4496 33.5344 41.6504 33.4682 41.8557L45.3207 48.8332C45.7224 48.4165 46.1963 48.0875 46.7424 47.8461C47.2882 47.6047 47.8785 47.484 48.5132 47.484C49.7596 47.484 50.8191 47.9205 51.6916 48.7936C52.5641 49.6669 53.0003 50.7273 53.0003 51.9748C53.0003 53.2223 52.5637 54.2814 51.6903 55.1519C50.8173 56.0228 49.757 56.4582 48.5095 56.4582ZM48.5132 53.9582C49.0763 53.9582 49.5482 53.7678 49.9291 53.3869C50.3099 53.0061 50.5003 52.5341 50.5003 51.9711C50.5003 51.408 50.3099 50.9361 49.9291 50.5553C49.5482 50.1741 49.0763 49.9836 48.5132 49.9836C47.9502 49.9836 47.4782 50.1741 47.0974 50.5553C46.7163 50.9361 46.5257 51.408 46.5257 51.9711C46.5257 52.5341 46.7163 53.0061 47.0974 53.3869C47.4782 53.7678 47.9502 53.9582 48.5132 53.9582ZM29.1382 42.6119C29.7057 42.6119 30.1814 42.4215 30.5653 42.0407C30.9495 41.6598 31.1416 41.1879 31.1416 40.6248C31.1416 40.0618 30.9495 39.5898 30.5653 39.209C30.1814 38.8282 29.7057 38.6378 29.1382 38.6378C28.5796 38.6378 28.1114 38.8282 27.7337 39.209C27.3559 39.5898 27.167 40.0618 27.167 40.6248C27.167 41.1879 27.3559 41.6598 27.7337 42.0407C28.1114 42.4215 28.5796 42.6119 29.1382 42.6119ZM48.5132 31.2661C49.0763 31.2661 49.5482 31.0755 49.9291 30.6944C50.3099 30.3136 50.5003 29.8416 50.5003 29.2786C50.5003 28.7155 50.3099 28.2436 49.9291 27.8628C49.5482 27.4819 49.0763 27.2915 48.5132 27.2915C47.9502 27.2915 47.4782 27.4819 47.0974 27.8628C46.7163 28.2436 46.5257 28.7155 46.5257 29.2786C46.5257 29.8416 46.7163 30.3136 47.0974 30.6944C47.4782 31.0755 47.9502 31.2661 48.5132 31.2661Z"
                  className="group-hover:fill-black fill-white transition-colors duration-300"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
