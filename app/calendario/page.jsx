'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Calendario() {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
    setSelectedDay(1);
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
    setSelectedDay(1);
  };

  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(selectedYear, selectedMonth, day);
      setSelectedDate(newDate);
    }
  };

  const getDaysInMonth = () => {
    const year = selectedYear;
    const month = selectedMonth;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysArray = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(i);
    }

    return daysArray;
  };

  const isSelectedDate = (day) => {
    if (!selectedDate || !day) return false;

    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === selectedMonth &&
      selectedDate.getFullYear() === selectedYear
    );
  };

  const isToday = (day) => {
    if (!day) return false;

    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === selectedMonth &&
      today.getFullYear() === selectedYear
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Calendário de postagens</h2>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700 ml-4"></div>
      </div>

      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8 border border-gray-200 dark:border-gray-700">
        <div className="p-8 pt-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-500 dark:text-gray-400 cursor-pointer" />
            </button>

            <h2 className="text-xl font-bold dark:text-white">
              {months[selectedMonth]} {selectedYear}
            </h2>

            <button
              onClick={goToNextMonth}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-gray-500 dark:text-gray-400 cursor-pointer" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map((day, index) => (
              <div
                key={index}
                onClick={() => handleDateClick(day)}
                className={`
                  p-2 text-center rounded cursor-pointer transition-colors
                  ${!day ? 'invisible' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} 
                  ${isToday(day) ? 'bg-blue-400 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 'dark:text-gray-400'}
                  ${isSelectedDate(day) ? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200' : ''}
                `}
              >
                {day}
              </div>
            ))}
          </div>

          {selectedDate && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Data selecionada: {selectedDate.toLocaleDateString('pt-BR')}
              </p>
            </div>
          )}
        </div>
      </div>

      <Separator className="bg-gray-200 dark:bg-gray-700 mt-8" />

      <div className="mt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Postagens para {selectedDay} de {months[selectedMonth]}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 text-left text-sm text-gray-500 dark:text-gray-400 rounded-xl shadow-sm overflow-hidden">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                  Postagem
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                  Hora
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                  Redes sociais
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 border-t border-gray-100 dark:border-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Lançamento do novo produto
                </td>
                <td className="px-6 py-4">09:30</td>
                <td className="px-6 py-4">Instagram, Facebook</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Agendado
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs flex items-center cursor-pointer"
                      onClick={() => handleEditPost(1)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs flex items-center text-red-600 dark:text-red-400 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30 cursor-pointer"
                      onClick={() => handleDeleteClick("Lançamento do novo produto")}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  Promoção de aniversário
                </td>
                <td className="px-6 py-4">14:00</td>
                <td className="px-6 py-4">Instagram, Facebook, Email</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Agendado
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs flex items-center"
                      onClick={() => handleEditPost(2)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs flex items-center text-red-600 dark:text-red-400 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
                      onClick={() => handleDeleteClick("Promoção de aniversário")}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Dica do dia</td>
                <td className="px-6 py-4">17:45</td>
                <td className="px-6 py-4">Instagram</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Agendado
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs flex items-center"
                      onClick={() => handleEditPost(3)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs flex items-center text-red-600 dark:text-red-400 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
                      onClick={() => handleDeleteClick("Dica do dia")}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
