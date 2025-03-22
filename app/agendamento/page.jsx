"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, Clock, Copy, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { toast } from "sonner";

export default function Agendamento() {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [caption, setCaption] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState("");
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hours = i.toString().padStart(2, '0')
    const minutes = '00'
    return `${hours}:${minutes}`
  })

  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime)
  }

  const generateCaption = async () => {
    setIsGenerating(true);
    try {
      const generatedCaption = await generateText(description);
      setGeneratedCaption(generatedCaption.text.replace(/<[^>]*>?/g, '').replace(/\*/g, ''));
    } catch (error) {
      console.error("Erro ao gerar texto:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  const copyToClipboard = () => {
    if (generatedCaption) {
      navigator.clipboard.writeText(generatedCaption)
        .then(() => {
          toast.success('Texto copiado para a área de transferência');
        })
        .catch(err => {
          console.error('Erro ao copiar texto: ', err);
        });
    }
  }

  return (
    <div className="w-[calc(100vw-300px)] p-6 md:p-10 flex flex-col gap-6">
      <h1 className="text-3xl font-bold mb-6">Agendar Postagem</h1>

      <div className="flex gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Data e Hora</CardTitle>
            <CardDescription>Selecione quando sua postagem será publicada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">
                  Data de publicação <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd/MM/yyyy") : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">
                  Horário <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !time && "text-muted-foreground"
                      )}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time ? time : "Selecione um horário"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-0" align="start">
                    <div className="max-h-[300px] overflow-y-auto p-1">
                      {timeOptions.map((t) => (
                        <Button
                          key={t}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start font-normal",
                            time === t && "bg-accent text-accent-foreground",
                          )}
                          onClick={() => handleTimeSelect(t)}
                        >
                          {t}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="socialMedia">Redes Sociais</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione as redes sociais..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Conteúdo da Postagem</CardTitle>
            <CardDescription>Adicione os detalhes da sua postagem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da postagem</Label>
                <Input
                  id="title"
                  placeholder="Digite o título da postagem"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Legenda da postagem</Label>
                <Textarea
                  id="caption"
                  placeholder="Legenda..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>

              <Button className="w-full">
                Agendar Postagem
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-6">
      <Card className="w-full">
          <CardHeader>
            <CardTitle>Em dúvida com a legenda?</CardTitle>
            <CardDescription>Nossa IA vai te ajudar a criar uma legenda perfeita para sua postagem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Gere uma legenda para a sua postagem</Label>
                <Input
                  id="title"
                  placeholder="Descreva brevemente sua postagem"
                />
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={generateCaption}
                  className="w-full cursor-pointer"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Gerar legenda criativa
                </Button>
              </div>

              <div className="relative">
                <label htmlFor="generatedCaption" className="block text-sm font-medium mb-2">
                  Texto gerado
                </label>
                <Textarea
                  id="generatedCaption"
                  placeholder="Texto..."
                  value={generatedCaption}
                  onChange={(e) => setGeneratedCaption(e.target.value)}
                  className="min-h-[150px]"
                />
                {generatedCaption && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-9 h-8 w-8 cursor-pointer"
                    onClick={copyToClipboard}
                    title="Copiar texto"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}