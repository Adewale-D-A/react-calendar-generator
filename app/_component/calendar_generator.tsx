
export default function RenderCalendarView({defaultCurrentDate, highlightedList = []}: {defaultCurrentDate?: Date, highlightedList: {date: Date, hex: string, reason: string}[]}){
    const [currentDay, setCurrentDay] = useState(defaultCurrentDate ?? new Date())
    const [generatedDays, setGeneratedDays] = useState([])

    useEffect(() => {
        setGeneratedDays(generateCalendarDays({currentDay, highlightedList}))
    }, [currentDay, highlightedList])

    const showNextMonth = () => {
        setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1))
    }
    const showPreviousMonth = () => {
        setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, 1))
    }
    return(
        <div>
            <h1>Calendar View</h1>
            <div className="w-full flex flex-col gap-5">
                <div className="w-full flex justify-between items-center">
                    <button onClick={showPreviousMonth}>Previous Month</button>
                    <p>{monthsAndDayStrings.monthString[currentDay.getMonth()]} {currentDay.getFullYear()}</p>
                    <button onClick={showNextMonth}>Next Month</button>
                </div>
                <div>
                    <div className="w-full grid grid-cols-7 gap-2 text-gray-500">
                        {
                            monthsAndDayStrings.dayString.map((day, index) => {
                                return <div key={index} className="">
                                    <span>{day}</span>
                                </div>
                            })
                        }
                    </div>
                    <div className="w-full grid grid-cols-7 gap-2 text-gray-500">
                        {generatedDays.map((day, index) => {
                            return <button type="button" key={index} title={day?.highlight.highlightReason} style={{backgroundColor:day.highlight.highlightColor} className="text-shadow text-black"}>
                                {day.day}
                            </button>
                        })}
                    </div>
                </div>  
            </div>          
        </div>
    )
}

const monthsAndDayStrings = {
    monthString: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayString: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']};

export function generateCalendarDays ({currentDay, highlightedList}:{currentDay: Date, highlightedList: {date: Date, hex: string, reason: string}[]}){

    const calendarDays = []
    const firstDayOfMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1)
    const weekdayOfFirstDay = firstDayOfMonth.getDay(); //from 0 - 6 i.e. Sunday to Saturday
    
    for(let day = 0; day < 42; day++){
        // This conditional block updates the current state of the default firstDayOfMonth Value
        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7)            
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay))
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1)
        }

        const foundHighlighted = highlightedList.find((highlighted) => highlighted.date.getDate() === firstDayOfMonth.getDate() && highlighted.date.getMonth() === firstDayOfMonth.getMonth() && highlighted.date.getFullYear() === firstDayOfMonth.getFullYear())

        let calendarDay = {
            month: firstDayOfMonth.getMonth(),
            day: firstDayOfMonth.getDate(),
            weekday: monthsAndDayStrings.dayString[firstDayOfMonth.getDay()],
            year: firstDayOfMonth.getFullYear(),
            currentMonth: firstDayOfMonth.getMonth() === currentDay.getMonth() ? true : false,
            selection: firstDayOfMonth.getDate() === currentDay.getDate() ? true : false,
            highlight: {
                isHighlighted: Boolean(foundHighlighted?.date),
                highlightColor: foundHighlighted?.hex ?? "#A8DF8E",
                highlightReason: foundHighlighted?.reason ?? "Available"
            }
        }
        calendarDays.push(calendarDay)
    }
 return calendarDays
}