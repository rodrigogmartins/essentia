import { Check } from 'lucide-react'

export function PerfumeCard({ perfume, isSelected, toggleSelection }: any) {
  return (
    <div
      onClick={() => toggleSelection(perfume)}
      className={`relative cursor-pointer rounded-xl border transition-all overflow-hidden shadow-md hover:shadow-lg bg-white ${
        isSelected ? 'ring-2 ring-black' : ''
      }`}
    >
      <img
        src={perfume.image_url}
        alt={perfume.name}
        className="w-full h-48 object-contain p-2"
      />
      <div className="p-2">
        <h2 className="text-md font-semibold text-neutral-900 leading-tight">
          {perfume.name}
        </h2>
        <p className="text-sm text-neutral-600">{perfume.brand}</p>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-black text-white rounded-full p-1">
          <Check size={16} />
        </div>
      )}
    </div>
  )
}