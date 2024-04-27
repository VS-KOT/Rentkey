import React from "react";

const LandingIntro = () => {
  return (
    <div className="h-screen ">
        <div class="m-1 md:m-4 h-auto md:h-scresen flex flex-col md:flex-row justify-between p-4">
          <div class="md:w-3/4">
            <div class="mt-16 font-cabin">
              <p class="text-3xl md:text-7xl font-semibold text-black">
                Welcome to{" "}
                <span className="text-cyan-500  hover:text-red-600 transition-all ease-in-out rounded-full ">
                  Rent Key 
                </span>{" "}
              </p>
              <p className="mt-10 font-cabin font-semibold">
              Your doorway to finding the perfect home in India !! 
              </p>
              <p class="leading-loose text-gray-800 mt-5">
                Whether you're seeking a cozy apartment in bustling cities like Mumbai or Bangalore, a serene villa in the hills of Shimla, or a beachside retreat in Goa, we're here to make your house hunting journey seamless and stress-free. Start your search today and embark on the exciting adventure of finding your dream abode. Happy exploring!"
              </p>
            </div>
          </div>
          <div class="md:ml-4 mt-9">
            <img
              src="\src\assets\LandingPhoto.jpg"
              alt=""
              class="w-[640px] rounded-3xl"
            />
          </div>
        </div>
    </div>
  );
};

export default LandingIntro;
