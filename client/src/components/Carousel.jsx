import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight, BsX } from 'react-icons/bs';
import { RxDotFilled, RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    // Open modal when entering fullscreen
    if (!isFullScreen) {
      openModal(currentIndex);
    }
  };

  const openModal = (index) => {
    setSelectedPhotoIndex(index);
    setIsFullScreen(true);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
    setIsFullScreen(false);
  };

  return (
    <div className={`max-w-[990px] h-[500px] w-full m-auto px-4 relative group ${isFullScreen ? 'fullscreen' : ''}`}>
      {/* Main image container */}
      <div
        style={{ backgroundImage: `url(${slides[currentIndex]})` }}
        className={`w-full h-full rounded-2xl bg-center bg-cover duration-500 cursor-pointer ${isFullScreen ? 'modal-image-fullscreen' : ''}`}
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? 'text-red-500' : ''}`} 
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
      {/* Fullscreen buttons */}
      <div className="absolute bottom-6 right-8 flex bg-black/20 text-white cursor-pointer rounded-full" onClick={toggleFullScreen}>
        {isFullScreen ? (
          <RxExitFullScreen size={24} />
        ) : (
          <RxEnterFullScreen size={24} />
        )}
      </div>

      {/* Modal */}
      {isFullScreen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/20 bg-opacity-75 z-50 flex items-center justify-center ">
          <div className="modal-container bg-white rounded-xl max-w-[90%] max-h-[90%] relative ">
            <div className="absolute bottom-6 right-8 flex bg-black/20 text-white cursor-pointer rounded-full" onClick={closeModal}>
            <RxExitFullScreen size={24} />
            </div>
            <img src={slides[selectedPhotoIndex]} alt="FullScreen" className="modal-image max-w-full max-h-full rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
