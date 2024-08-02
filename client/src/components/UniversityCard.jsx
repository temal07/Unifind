import React from 'react'

export default function UniversityCard({ university }) {
  return (
    <div className="group relative w-full max-w-xl border border-emerald-600 hover:border-2 h-[200px] overflow-hidden rounded-lg transition-all flex flex-row bg-white shadow-lg">
      <div className="flex-shrink-0 w-1/3">
        <img
          src={university.image}
          alt={`${university.name} image`}
          className="h-full w-full object-cover transition-all duration-300"
        />
      </div>
      <div className="p-3 flex flex-col justify-between w-2/3">
        <div>
          <p className="text-lg font-semibold mb-2">{university.name}</p>
          <p className="text-gray-600 line-clamp-3">{university.description}</p>
        </div>
        <a
          href={university.link}
          target="_blank"
          rel="noopener noreferrer"
          className="z-10 self-start border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 px-4 rounded-md"
        >
          Visit Website
        </a>
      </div>
    </div>
  )
}
