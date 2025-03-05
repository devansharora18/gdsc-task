import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-center bg-[var(--background)] min-h-screen p-6">
      <div className="bg-[var(--card)] p-6 rounded-lg shadow-lg w-full max-w-3xl text-center animate-pulse">
        <div className="w-24 h-24 bg-[var(--secondary)] rounded-full mx-auto"></div>
        <div className="h-5 w-32 bg-[var(--secondary)] rounded mt-4 mx-auto"></div>
        <div className="h-4 w-48 bg-[var(--secondary)] rounded mt-2 mx-auto"></div>
      </div>

      <div className="w-full max-w-3xl mt-6">
        <div className="h-5 w-24 bg-[var(--secondary)] rounded mb-4"></div>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-[var(--card)] p-4 rounded-lg shadow-md mb-4 animate-pulse">
            <div className="h-4 w-3/4 bg-[var(--secondary)] rounded"></div>
            <div className="h-3 w-5/6 bg-[var(--secondary)] rounded mt-2"></div>
            <div className="flex items-center space-x-4 mt-3">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="h-4 w-10 bg-[var(--secondary)] rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
