import React, { useState } from 'react';
import Image from './Image';
import PlaceGallery from './PlaceGallery';

const PropertyCard = ({ property }) => {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{property.title}</div>
        <p className="text-gray-700 text-base">{property.address}</p>
      </div>
      <div className="px-6 py-4">
        <div className="flex flex-wrap">
          {property.photos.map((photo, index) => (
            <Image
              key={index}
              className="w-1/4 rounded-lg mr-2 mb-2 cursor-pointer"
              src={photo}
              alt={`Photo ${index + 1}`}
              onClick={() => setShowGallery(true)}
            />
          ))}
        </div>
        <div className="my-4">
          <h3 className="font-bold mb-2">Description</h3>
          <p className="text-gray-700">{property.description}</p>
        </div>
        <div className="my-4">
          <h3 className="font-bold mb-2">Perks</h3>
          <ul className="list-disc pl-4">
            {property.perks.map((perk, index) => (
              <li key={index}>{perk}</li>
            ))}
          </ul>
        </div>
        <div className="my-4">
          <h3 className="font-bold mb-2">Extra Information</h3>
          <p className="text-gray-700">{property.extraInfo}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Max Guests: {property.maxGuests}</p>
          <p className="text-gray-700">Price: {property.price}</p>
        </div>
      </div>
      {showGallery && (
        <PlaceGallery
          title={property.title}
          photos={property.photos}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
};

export default PropertyCard;
