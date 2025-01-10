import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { type CarouselApi } from "@/components/ui/carousel"
import { Icon } from "@iconify/react"
import Image from "next/image"
import React from "react"

export function CarouselHero() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    const interval = setInterval(() => {
      const nextItem = (current + 1) % count
      api.scrollTo(nextItem)
    }, 3000)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
    return () => {
      clearInterval(interval)
    }
  }, [api,current,count])

  const handleDotClick = (index: number) => {
    api?.scrollTo(index)
  }

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {
          image.map((image, index) => (
            <CarouselItem key={index} className="relative">
              <Card >
                <Image
                  src={image}
                  className="object-fill sm:min-w-[20vh] xs:min-w-[9vh] md:min-w-[20vh] min-w-[14vh]"
                  width={892}
                  alt="banner"
                  height={504}
                />
              </Card>

            </CarouselItem>
          ))
        }

      </CarouselContent>
      <div className="absolute sm:left-[40%] sm:right-[40%] left-[35%] right-[35%] flex bottom-0 ">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)} // Navegar a la imagen correspondiente
            className={`p-1 rounded-full cursor-pointer transition-all duration-300 ${current === index ? "text-red-600" : "text-gray-400"
              }`}
          >
            <Icon
              icon="icon-park-outline:dot"
              width="20"
              height="20"

            />
          </div>
        ))}
      </div>

    </Carousel>
  )
}


const image = [
  "/banne01.svg",
  "/banne01.svg",
  "/banne01.svg",
  "/banne01.svg",
  "/banne01.svg",
]