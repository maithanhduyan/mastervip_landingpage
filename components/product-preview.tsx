"use client"
import { Carousel } from "@/components/ui/carousel"
import type { PreviewItem } from "@/types/carousel"

interface ProductPreviewProps {
  title: string
  items: PreviewItem[]
}

export function ProductPreview({ title, items }: ProductPreviewProps) {
  return (
    <section id="preview" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f9d423] to-[#d4af37] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto mt-6"></div>
        </div>

        <Carousel itemsToShow={{ sm: 1, md: 2, lg: 3 }} showArrows={true} showDots={true} autoPlayInterval={0}>
          {items.map((item) => (
            <div key={item.id} className="carousel-item">
              <div className="h-64 bg-gradient-to-br from-yellow-900 to-black flex items-center justify-center">
                {item.imageUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className={`${item.icon} text-6xl text-yellow-500 opacity-70`}></i>
                    </div>
                  </div>
                ) : (
                  <i className={`${item.icon} text-6xl text-yellow-500 opacity-50`}></i>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
