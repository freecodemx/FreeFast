// src/components/Avatar.js
import { useState } from 'react';
import myImage from '../components/img/gordito.png';

const Avatar = () => {
  const [isWaving, setIsWaving] = useState(false);

  const handleWave = () => {
    setIsWaving(true);
    setTimeout(() => {
      setIsWaving(false);
    }, 1000);
  };

  return (
    <div className={`avatar ${isWaving ? 'waving' : ''}`} onClick={handleWave}>
      <img
        src={myImage}
        alt="Avatar"
        className={`text-center rounded-full w-32 h-32 transition-transform transform ${
          isWaving ? 'rotate-12' : 'rotate-0'
        }`}
      />
      <label className="block text-center text-gray-600 text-sm mt-2">¡Holaa!</label>
    </div>
  );
};

export default Avatar;
 