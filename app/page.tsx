import RenderCalendarView from "./_component/calendar_generator";
import testData from "./_assets/test_dataset.json";
import { Logo } from "./_component/logo";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className=" w-full h-full max-w-2xl flex flex-col items-center justify-center gap-10">
        <Logo />
        <RenderCalendarView
          defaultCurrentDate={new Date(testData.defaultCurrentDate)}
          highlightedList={testData.highlightedList.map((item) => ({
            date: new Date(item.date),
            hex: item.hex,
            reason: item.reason,
          }))}
        />
      </main>
    </div>
  );
}
