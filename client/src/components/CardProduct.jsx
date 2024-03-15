import React from "react";
import sliderDesktop1 from "../assets/test_product2.png";
import { Link } from "react-router-dom";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling
import { frontUrl } from "../utils/config";
import ContentLoader from "react-content-loader";

export const CardProduct = ({
  id,
  off,
  img,
  stars,
  stock,
  title,
  description,
  price,
  priceOff,
}) => {
  // URL deploy o localhost
  const urlDetail = `${frontUrl}/details/${id}`;

  //? --- Loader ---
  const MyLoader = (props) => (
    <ContentLoader
      speed={2}
      width={260}
      height={500}
      viewBox="0 0 260 500"
      backgroundColor="#dedede"
      foregroundColor="#919191"
      {...props}
    >
      <rect x="21" y="277" rx="3" ry="3" width="52" height="6" />
      <rect x="21" y="255" rx="3" ry="3" width="178" height="6" />
      <rect x="20" y="235" rx="3" ry="3" width="208" height="7" />
      <rect x="21" y="215" rx="3" ry="3" width="208" height="7" />
      <rect x="19" y="17" rx="0" ry="0" width="212" height="163" />
      <rect x="23" y="313" rx="3" ry="3" width="52" height="21" />
      <rect x="20" y="356" rx="0" ry="0" width="215" height="33" />
    </ContentLoader>
  );
  // --- Loader ---

  return (
    <>
      {id ? (
        <div className="card-container  my-8  transition-all-300 translateY-2 relative flex h-[500px] flex-col overflow-hidden rounded-lg bg-white p-5 shadow-md hover:z-[2] hover:shadow-xl">
          <div className="absolute top-[10px] right-[10px]">
          </div>
          {off && (
            <div className="absolute top-0 left-0 flex h-[35px] w-[90px] items-center justify-center rounded-br-lg bg-primary">
              <span className="text-md text-center font-semibold uppercase text-white">
                {/* 25% Off */}
                {off + " ID % Off"}
              </span>
            </div>
          )}
          <div className="h-[190px] overflow-hidden rounded-lg">
            <a href="#">
              <img
                className="object-contain h-full w-full"
                src={img ? img : sliderDesktop1}
                alt="product"
              />
            </a>
          </div>
          <div className="my-2 flex justify-between">
            {/* <div className="flex">
              <i className="bi bi-star-fill flex text-base text-star"></i>
              <i className="bi bi-star-fill flex text-base text-star"></i>
              <i className="bi bi-star-fill flex text-base text-star"></i>
              <i className="bi bi-star-fill flex text-base text-star"></i>
              <i className="bi bi-star-fill flex text-base text-gray-200"></i>
            </div> */}
            {/* <div>
          <span className="rounded-md bg-green-300 py-1 px-2 text-xs font-bold uppercase text-white">
            instock
          </span>
        </div> */}
          </div>
          <div className="my-1">
            <a className="clamp break-all font-medium" href="#">
              {/* Moto e7i Power */}
              {title}
            </a>
          </div>
          <div className="my-1">
            <p className="clamp-2 text-sm text-gray-400">{description}</p>
          </div>
          {/* <div className="my-2 flex gap-2">
        <div className="block h-3 w-3 rounded-full bg-blue-600"></div>
        <div className="block h-3 w-3 rounded-full bg-red-600"></div>
        <div className="block h-3 w-3 rounded-full bg-yellow-600"></div>
        <div className="block h-3 w-3 rounded-full bg-black"></div>
      </div> */}
          {/* <div className="my-2 flex gap-2">
        <span className="font-bold">Size:</span>
        <ul className="flex gap-3">
          <li>S</li>
          <li>M</li>
          <li>L</li>
          <li>XL</li>
        </ul>
      </div> */}
          <div className="my-1 mt-auto">
            <span className="text-3xl  font-bold">${price}</span>
            {/* <span className="text-sm text-primary line-through">${price}</span> */}
          </div>
          <div className="mt-auto">
            <Link
              className="btn-effect transition-all-300 flex w-full items-center justify-center rounded-lg bg-primary p-2"
              to={urlDetail}
            >
              <span className="font-bold uppercase text-white">
                View details
              </span>
            </Link>
          </div>
        </div>
      ) : (
        // Array.from({ length: 6 }, (_, index) => <MyLoader key={index} />)
        <MyLoader />
      )}
    </>
  );
};
