import { addDays, nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday, nextSaturday, nextSunday, addMonths, setDate } from 'date-fns';

export function calculateNextDueDate(task) {
    const today = new Date();

    if (task.frequency === 'daily') {
        return addDays(today, 1);
    } else if (Array.isArray(task.frequency)) {
        // Handle array-based frequency for weekly and monthly tasks
        const weekdayHandlers = {
            mon: nextMonday,
            tue: nextTuesday,
            wed: nextWednesday,
            thu: nextThursday,
            fri: nextFriday,
            sat: nextSaturday,
            sun: nextSunday
        };
        let nextDate = null;
        for (let day of task.frequency) {
            day = day.toLowerCase(); // Ensure lowercase for key matching
            if (weekdayHandlers[day]) {
                nextDate = weekdayHandlers[day](today);
            } else if (parseInt(day)) { // Handle numeric day for monthly tasks
                nextDate = setDate(today, parseInt(day));
                if (today.getDate() > day) {
                    nextDate = addMonths(nextDate, 1); // Move to next month if the day has passed
                }
            }
            if (nextDate) break; // Stop once the next date is determined
        }
        return nextDate;
    }
    return today; // Fallback to today if no conditions match
}