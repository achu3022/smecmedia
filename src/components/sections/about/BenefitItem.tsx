'use client'

interface BenefitItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <div
      className="group flex flex-col items-center text-center gap-4 p-6 rounded-2xl border transition-all duration-300 hover:border-[rgba(250,204,21,0.45)] hover:shadow-[0_0_20px_rgba(250,204,21,0.1)] h-full"
      style={{ background: 'rgba(17,17,17,0.85)', borderColor: 'rgba(250,204,21,0.18)' }}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(250,204,21,0.4)]"
        style={{ background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.2)', color: '#FACC15' }}
      >
        {icon}
      </div>
      <h3 className="text-sm sm:text-base font-black text-white">{title}</h3>
      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#6B7280' }}>{description}</p>
    </div>
  )
}
