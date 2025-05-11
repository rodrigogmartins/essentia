export const MultiSelect = ({ label, options, selected, setSelected }: any) => {
    const toggle = (item: string) => {
      setSelected((prev: string[]) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      )
    }
  
    return (
      <div className="mb-6">
        <p className="font-medium mb-2">{label}</p>
        <div className="flex flex-wrap gap-2">
          {options.map((item: any) => (
            <button
              key={item.value}
              onClick={() => toggle(item)}
              className={`px-3 py-1 rounded-full font-semibold text-sm border ${
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