import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm" style={{ color: '#6B7280' }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1">
              {isLast ? (
                <span style={{ color: '#FACC15' }} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15] rounded"
                  >
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="select-none">/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
