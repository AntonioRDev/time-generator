import { format, add, addMinutes, differenceInMinutes } from "date-fns";

const WORK_MINUTES = 8 * 60;

// Função para gerar um horário aleatório dentro de um intervalo
const generateRandomTime = (start: Date, end: Date): Date => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
};

// Função para gerar os horários de trabalho para um dia
const generateWorkScheduleForDay = (): void => {
  const today = new Date();
  const startOfWorkRangeStart = new Date(today);
  startOfWorkRangeStart.setHours(8, 0, 0); // Início do intervalo de entrada
  const startOfWorkRangeEnd = new Date(today);
  startOfWorkRangeEnd.setHours(9, 22, 0); // Fim do intervalo de entrada

  const startOfWork = generateRandomTime(
    startOfWorkRangeStart,
    startOfWorkRangeEnd
  );

  const lunchStartRangeStart = new Date(today);
  lunchStartRangeStart.setHours(12, 0, 0); // Horário máximo de início do almoço
  const lunchStartRangeEnd = new Date(today);
  lunchStartRangeEnd.setHours(13, 0, 0); // Horário máximo de término do almoço

  const lunchTimeStart = generateRandomTime(
    lunchStartRangeStart,
    lunchStartRangeEnd
  );
  const lunchTimeEnd = generateRandomTime(
    add(lunchTimeStart, { minutes: 30 }),
    add(lunchTimeStart, { hours: 1, minutes: 30 })
  );

  // Calcula fim do expediente baseado no horario de inicio, almoço e fim do almoço
  const alreadyWorked = differenceInMinutes(lunchTimeStart, startOfWork);
  const remainingTime = WORK_MINUTES - alreadyWorked;
  const endOfWork = addMinutes(lunchTimeEnd, remainingTime);

  console.log("Horário de entrada:", format(startOfWork, "HH:mm"));
  console.log(
    "Horário de saída para o almoço:",
    format(lunchTimeStart, "HH:mm")
  );
  console.log("Horário de retorno do almoço:", format(lunchTimeEnd, "HH:mm"));
  console.log("Fim do expediente:", format(endOfWork, "HH:mm"));
};

// Função para gerar os horários de trabalho para o mês inteiro
const generateWorkScheduleForMonth = (month: number, year: number): void => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  let currentDate = startDate;

  while (currentDate <= endDate) {
    console.log("\nData:", format(currentDate, "dd/MM/yyyy"));
    generateWorkScheduleForDay();
    currentDate = add(currentDate, { days: 1 });
  }
};

// Gerar horários de trabalho para o mês de março de 2024
generateWorkScheduleForMonth(3, 2024);
