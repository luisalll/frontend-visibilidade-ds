"use client";

import { ChevronLeft, ChevronRight, Edit, Calendar } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getTemplates } from "@/api/template";

export default function Postagens() {
  const router = useRouter();

  const [templatesEmblaRef, templatesEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [recentWorksEmblaRef, recentWorksEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [scheduledPostsEmblaRef, scheduledPostsEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [templates, setTemplates] = useState([]);

  const scrollPrevTemplates = () => {
    if (templatesEmblaApi) {
      templatesEmblaApi.scrollPrev();
    }
  };

  const scrollNextTemplates = () => {
    if (templatesEmblaApi) {
      templatesEmblaApi.scrollNext();
    }
  };

  const scrollPrevRecentWorks = () => {
    if (recentWorksEmblaApi) {
      recentWorksEmblaApi.scrollPrev();
    }
  };

  const scrollNextRecentWorks = () => {
    if (recentWorksEmblaApi) {
      recentWorksEmblaApi.scrollNext();
    }
  };

  const scrollPrevScheduledPosts = () => {
    if (scheduledPostsEmblaApi) {
      scheduledPostsEmblaApi.scrollPrev();
    }
  };

  const scrollNextScheduledPosts = () => {
    if (scheduledPostsEmblaApi) {
      scheduledPostsEmblaApi.scrollNext();
    }
  };

  const handleEditPost = (postId) => {
    router.push(`/postagens/template/${postId}`);
  };

  const handleSchedulePost = () => {
    router.push('/agendamento');
  };

  const handleTemplateClick = (templateId) => {
    router.push(`/postagens/template/${templateId}`);
  };

  const fetchTemplates = async () => {
    const templates = await getTemplates();
    setTemplates(templates.data);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const recentWorks = [
    { id: 1, src: "/placeholder.svg?height=128&width=256&text=Nature", alt: "Nature" },
    { id: 2, src: "/placeholder.svg?height=128&width=256&text=Architecture", alt: "Architecture" },
    { id: 3, src: "/placeholder.svg?height=128&width=256&text=Travel", alt: "Travel" },
    { id: 4, src: "/placeholder.svg?height=128&width=256&text=Food", alt: "Food" },
    { id: 5, src: "/placeholder.svg?height=128&width=256&text=Technology", alt: "Technology" },
    { id: 6, src: "/placeholder.svg?height=128&width=256&text=Art", alt: "Art" },
    { id: 7, src: "/placeholder.svg?height=128&width=256&text=Sports", alt: "Sports" },
    { id: 8, src: "/placeholder.svg?height=128&width=256&text=Fashion", alt: "Fashion" },
  ];

  const scheduledPosts = [
    { id: 1, src: "/placeholder.svg?height=128&width=256&text=Nature", alt: "Nature" },
    { id: 2, src: "/placeholder.svg?height=128&width=256&text=Architecture", alt: "Architecture" },
    { id: 3, src: "/placeholder.svg?height=128&width=256&text=Travel", alt: "Travel" },
    { id: 4, src: "/placeholder.svg?height=128&width=256&text=Food", alt: "Food" },
    { id: 5, src: "/placeholder.svg?height=128&width=256&text=Technology", alt: "Technology" },
    { id: 6, src: "/placeholder.svg?height=128&width=256&text=Art", alt: "Art" },
    { id: 7, src: "/placeholder.svg?height=128&width=256&text=Sports", alt: "Sports" },
    { id: 8, src: "/placeholder.svg?height=128&width=256&text=Fashion", alt: "Fashion" },
  ]

  return (
    <div className="flex flex-col gap-4 p-6">
      {templates.length > 0 && (
        <div className="space-y-4">
          <div className="mt-4">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Templates</h2>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700 ml-4"></div>
              </div>

              <div className="relative mt-4">
                <div className="overflow-hidden" ref={templatesEmblaRef}>
                  <div className="flex">
                    {templates.map((template, index) => (
                      <div key={index} className="flex-[0_0_25%] min-w-0 relative p-1 cursor-pointer group" onClick={() => handleTemplateClick(template._id)}>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden h-32 relative">
                          <img
                            src={`${process.env.API_URL}/${template.imagePath}`}
                            alt={template.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                              Usar template
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 shadow-md z-10 cursor-pointer"
                  onClick={scrollPrevTemplates}
                >
                  <ChevronLeft className="w-4 h-4 dark:text-gray-300" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 shadow-md z-10 cursor-pointer"
                  onClick={scrollNextTemplates}
                >
                  <ChevronRight className="w-4 h-4 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="mt-4">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Meus trabalhos recentes</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700 ml-4"></div>
            </div>

            <div className="relative mt-4">
              <div className="overflow-hidden" ref={recentWorksEmblaRef}>
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
                      <div className="flex flex-col gap-1 mt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full h-7 text-xs cursor-pointer"
                          onClick={() => handleEditPost(work.id)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full h-7 text-xs cursor-pointer"
                          onClick={() => handleSchedulePost()}
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          Agendar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="absolute left-2 top-1/3 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 shadow-md z-10 cursor-pointer"
                onClick={scrollPrevRecentWorks}
              >
                <ChevronLeft className="w-4 h-4 dark:text-gray-300" />
              </button>
              <button
                className="absolute right-2 top-1/3 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 shadow-md z-10 cursor-pointer"
                onClick={scrollNextRecentWorks}
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Posts agendados</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700 ml-4"></div>
            </div>

            <div className="relative mt-4">
              <div className="overflow-hidden" ref={scheduledPostsEmblaRef}>
                <div className="flex">
                  {scheduledPosts.map((post, index) => (
                    <div key={index} className="flex-[0_0_25%] min-w-0 relative p-1">
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden h-32 relative">
                        <img
                          src={post.src}
                          alt={post.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 shadow-md z-10 cursor-pointer"
                onClick={scrollPrevScheduledPosts}
              >
                <ChevronLeft className="w-4 h-4 dark:text-gray-300" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 shadow-md z-10 cursor-pointer"
                onClick={scrollNextScheduledPosts}
              >
                <ChevronRight className="w-4 h-4 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}