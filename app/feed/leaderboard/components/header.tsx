import React from 'react';

interface City {
  rank: number;
  name: string;
  score: number | string;
  imageUrl: string;
}

interface LeaderboardProps {
  title: string;
  subtitle: string;
  date: string;
  cities: City[];
}

export function Leaderboard({ title, subtitle, date, cities }: LeaderboardProps) {
  return (
    <div className="w-full bg-gradient-to-b from-indigo-700 to-indigo-600 rounded-3xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="px-6 py-8 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-indigo-100 mb-1">{subtitle}</p>
        <p className="text-sm text-indigo-200">As of {date}</p>
      </div>

      {/* Cities List */}
      <div className="bg-white rounded-t-3xl">
        {cities.map((city, index) => (
          <div
            key={city.name}
            className={`flex items-center px-6 py-4 hover:bg-indigo-50 transition-colors duration-200
              ${index !== cities.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            {/* Rank */}
            <span className={`w-8 text-lg font-semibold
              ${index === 0 ? 'text-indigo-600' : 
                index === 1 ? 'text-indigo-500' :
                index === 2 ? 'text-indigo-400' : 'text-gray-400'}`}>
              {city.rank}
            </span>

            {/* City Image & Name */}
            <div className="flex items-center flex-1">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-gray-800">{city.name}</span>
            </div>

            {/* Score */}
            <span className="text-right min-w-[80px] font-semibold text-gray-600">
              {typeof city.score === 'number' ? city.score.toLocaleString() : city.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}