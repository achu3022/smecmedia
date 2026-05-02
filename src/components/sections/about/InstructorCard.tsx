import Image from 'next/image'

interface InstructorCardProps {
  name: string
  role: string
  bio: string
  image?: string
}

export default function InstructorCard({ name, role, bio, image }: InstructorCardProps) {
  return (
    <div
      className="p-6 flex flex-col items-center text-center gap-4 rounded-2xl border transition-all duration-300 hover:border-[rgba(250,204,21,0.45)] hover:shadow-[0_0_20px_rgba(250,204,21,0.1)]"
      style={{ background: 'rgba(17,17,17,0.85)', borderColor: 'rgba(250,204,21,0.18)' }}
    >
      {/* Avatar */}
      <div
        className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0"
        style={{ border: '2px solid rgba(250,204,21,0.4)' }}
      >
        {image ? (
          <Image src={image} alt={`Photo of ${name}`} width={96} height={96} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'rgba(250,204,21,0.1)' }}
            aria-label={`Avatar placeholder for ${name}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              className="w-12 h-12" style={{ color: 'rgba(250,204,21,0.5)' }} aria-hidden="true">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-white font-black text-lg">{name}</h3>
        <p className="text-sm font-semibold" style={{ color: '#FACC15' }}>{role}</p>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>{bio}</p>
    </div>
  )
}
