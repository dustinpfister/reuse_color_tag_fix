import { get_print_index_by_date } from './get_print_index_by_date.js';
const gen_outlook = (COLOR, year=2025, month=0) => {
    const days_in_month = ( new Date(2025, 9 + 1, -1)   ).getDate();
    let day = 1;
    const result = {
        year: year,
        month: month,
        days: [],
    };
    while(day <= days_in_month){
        const date = new Date(year, month, day);
        const print_index = get_print_index_by_date( COLOR, date );
        const colorObj = COLOR.data[print_index];
        result.days.push({
            print_index: print_index,
            day: day,
            week_day: date.getDay(),
            color: colorObj.desc
        });
        day += 1;
    }
    return result;
};
export { gen_outlook };
