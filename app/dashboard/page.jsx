"use client";

import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: "2",
  });

  const scrollPrev = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  };

  const scrollNext = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  };

  const handleEditPost = (id) => {
    router.push(`/postagens/template/${id}`);
  };

  const recentWorks = [
    { src: "/placeholder.svg?height=128&width=256&text=Nature", alt: "Nature" },
    { src: "/placeholder.svg?height=128&width=256&text=Architecture", alt: "Architecture" },
    { src: "/placeholder.svg?height=128&width=256&text=Travel", alt: "Travel" },
    { src: "/placeholder.svg?height=128&width=256&text=Food", alt: "Food" },
    { src: "/placeholder.svg?height=128&width=256&text=Technology", alt: "Technology" },
    { src: "/placeholder.svg?height=128&width=256&text=Art", alt: "Art" },
    { src: "/placeholder.svg?height=128&width=256&text=Sports", alt: "Sports" },
    { src: "/placeholder.svg?height=128&width=256&text=Fashion", alt: "Fashion" },
  ];

  const upcomingPosts = [
    {
      id: 1,
      title: "Leslie Alexander",
      date: "15/03/2025",
      time: "19:30",
      platforms: "Instagram, Facebook e E-mail",
    },
    {
      id: 2,
      title: "Michael Foster",
      date: "18/03/2025",
      time: "20:30",
      platforms: "Instagram",
    },
    {
      id: 3,
      title: "Dries Vincent",
      date: "22/03/2025",
      time: "15:30",
      platforms: "Facebook e E-mail",
    },
    {
      id: 4,
      title: "Lindsay Walton",
      date: "25/03/2025",
      time: "19:30",
      platforms: "Twitter",
    },
    {
      id: 5,
      title: "Courtney Henry",
      date: "01/04/2025",
      time: "14:00",
      platforms: "Instagram, Facebook e E-mail",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="space-y-4">
        <div className="mt-4">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Meus trabalhos recentes</h2>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700 ml-4"></div>
              </div>

              <div className="relative mt-4">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {recentWorks.map((work, index) => (
                      <div key={index} className="flex-[0_0_25%] min-w-0 relative p-1">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden h-32 relative">
                          <img
                            src={work.src}
                            alt={work.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 shadow-md z-10 cursor-pointer"
                  onClick={scrollPrev}
                >
                  <ChevronLeft className="w-4 h-4 dark:text-gray-300" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 shadow-md z-10 cursor-pointer"
                  onClick={scrollNext}
                >
                  <ChevronRight className="w-4 h-4 dark:text-gray-300" />
                </button>
              </div>
            </div>
        </div>
      </div>

      <div className="space-y-4">
      <div className="mt-4">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Próximas postagens</h2>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700 ml-4"></div>
              </div>

              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse bg-white dark:bg-gray-800 text-left text-sm text-gray-500 dark:text-gray-400 rounded-xl overflow-hidden">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                        Postagem
                      </th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                        Data
                      </th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                        Hora
                      </th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                        Redes sociais
                      </th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700 border-t border-gray-100 dark:border-gray-700">
                    {upcomingPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{post.title}</td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{post.date}</td>
                        <td className="px-6 py-4">{post.time}</td>
                        <td className="px-6 py-4">{post.platforms}</td>
                        <td className="px-6 py-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs flex items-center"
                            onClick={() => handleEditPost(post.id)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Editar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}