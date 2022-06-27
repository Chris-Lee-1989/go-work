export default interface WeekWorkProps {
  date: string | null;
  weekday: number | null;
  workingHour: number | null;
  workingMin: number | null;
  workingSec: number | null;
  workingTime: number | null;
  isHoliday: 'Y' | 'N' | null;
  todayWorkingTime: number | null;
}
