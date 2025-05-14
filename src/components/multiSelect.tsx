import { MultiSelectOptionsI } from "@/data/MultiSelectOptions.interface"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export interface MultiSelectI {
  label: string,
  options: MultiSelectOptionsI[],
  selected: string[],
  setSelected(cb: any): void
}

export function MultiSelectChips({ label, options, selected, setSelected }: MultiSelectI) {
  const toggle = (item: string) => {
    setSelected((prev: string[]) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  return (
    <div className="mb-6">
      <p className="font-medium mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((item: MultiSelectOptionsI) => (
          <button
            key={item.value}
            onClick={() => toggle(item.value)}
            className={`px-3 py-1 rounded-full border font-semibold text-sm ${
              selected.includes(item.value) ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {item.description}
          </button>
        ))}
      </div>
    </div>
  )
}

export function MultiSelect({ label, options, selected, setSelected }: MultiSelectI) {
  const [query, setQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)
    
  const normalize = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c').toLowerCase()

  const filteredOptions = options.filter(
    (opt: any) =>
      normalize(opt.description).includes(normalize(query)) &&
        !selected?.some((s: any) => s.value === opt.value)
  )

  const addOption = (option: any) => {
    setSelected([...selected, option])
    setQuery('')
  }

  const removeOption = (value:any) => {
    setSelected(selected.filter((opt: any) => opt.value !== value))
  }

  const removeLastOption = () => {
    selected.pop()
    setSelected([...selected])
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length)
    } else if (e.key === 'Enter' && filteredOptions[highlightedIndex]) {
      e.preventDefault()
      addOption(filteredOptions[highlightedIndex])
    } else if (e.key === 'Backspace' && query.length === 0) {
      e.preventDefault()
      removeLastOption()
    }
  }

  useEffect(() => {
    setHighlightedIndex(0)
  }, [query])

  return (
    <div className="w-full mb-6 relative">
      <p className="font-medium mb-2">{label}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map((opt:any) => (
          <span
            key={opt.value}
            className="flex items-center font-semibold bg-white text-black px-3 py-1 rounded-full text-sm"
          >
            {opt.description}
            <button
              onClick={() => removeOption(opt.value)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Digite para buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      />
      {isFocused && (
        <div className="absolute z-50 bg-black border border-gray-300 mt-1 rounded-md shadow-md w-full max-h-48 overflow-y-auto">
          {filteredOptions.map((opt:any, index: number) => (
            <div
              key={opt.value}
              onClick={() => addOption(opt)}
              className={cn(
                'px-3 py-2 cursor-pointer',
                index === highlightedIndex ? 'bg-neutral-700' : 'hover:bg-neutral-700'
              )}
            >
              {opt.description}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className="px-3 py-2 text-gray-500">Nenhuma opção encontrada</div>
          )}
        </div>
      )}
    </div>
  )
}