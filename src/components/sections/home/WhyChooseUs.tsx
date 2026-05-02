import FadeUpOnScroll from '@/components/animations/FadeUpOnScroll'

const BENEFITS = [
  {
    emoji: '🎓',
    title: 'Industry-Level Training',
    description: 'Real tools, real projects, real industry standards — learn exactly what employers expect.',
  },
  {
    emoji: '🎬',
    title: 'Real Project Experience',
    description: 'Build a portfolio with actual client-ready work before you even graduate.',
  },
  {
    emoji: '🤖',
    title: 'AI-Integrated Learning',
    description: 'Stay ahead with the latest AI creative tools — Midjourney, Firefly, RunwayML and more.',
  },
  {
    emoji: '💼',
    title: 'Placement Support',
    description: 'Career guidance and industry connections to help you land your first role.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0A0A0A' }} aria-labelledby="why-choose-us-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14" id="why-choose-us-heading">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(250,204,21,0.6)' }}>
            Why Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {BENEFITS.map((benefit, index) => (
            <FadeUpOnScroll key={benefit.title} delay={index * 0.15}>
              <div
                className="group flex flex-col items-center text-center gap-4 p-6 rounded-2xl border transition-all duration-300 hover:border-[rgba(250,204,21,0.45)] hover:shadow-[0_0_20px_rgba(250,204,21,0.1)] h-full"
                style={{ background: 'rgba(17,17,17,0.85)', borderColor: 'rgba(250,204,21,0.15)' }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(250,204,21,0.4)]"
                  style={{ background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.2)' }}
                >
                  {benefit.emoji}
                </div>
                <h3 className="text-sm sm:text-base font-black text-white">{benefit.title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                  {benefit.description}
                </p>
              </div>
            </FadeUpOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
