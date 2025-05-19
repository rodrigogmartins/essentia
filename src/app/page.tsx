'use client'

import { useRouter } from 'next/navigation'
import { Stars, Sparkles, SlidersHorizontal } from 'lucide-react'

export default function Home() {
    const router = useRouter()

    const flows = [
      {
        title: 'Recomendação Simples',
        description: 'Indique os perfumes que você já conhece e gosta. Ideal para quem não entende de notas ou acordes.',
        icon: <Stars className="w-6 h-6 text-white" />,
        path: '/form/simple',
      },
      {
        title: 'Recomendação Avançada',
        description: 'Escolha notas e acordes. Recomendado para quem conhece bem perfumes.',
        icon: <SlidersHorizontal className="w-6 h-6 text-white" />,
        path: '/form/complete',
      },
    ]
    
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 text-center">Como você prefere receber sua recomendação?</h1>

      <div className="w-full max-w-md flex flex-col gap-6">
        {flows.map((flow) => (
          <div
            key={flow.path}
            onClick={() => router.push(flow.path)}
            className="cursor-pointer backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-2xl shadow-md hover:shadow-xl hover:bg-white/20 transition-all p-6 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-2">
              {flow.icon}
              <h2 className="text-lg font-semibold">{flow.title}</h2>
            </div>
            <p className="text-sm text-white/80">{flow.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}