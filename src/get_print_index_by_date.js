import { mod } from './utils.js';
const get_print_index_by_date = (COLOR, DATE=new Date()) => {
    const time = DATE.getTime();
    const ms = Math.round( time  - COLOR.first_tuesday.getTime() );
    const week_count = Math.floor( ms  / ( 1000  * 60 * 60 * 24 * 7) );
    if(COLOR.autoset){
        const week_delta = week_count * ( COLOR.ascending ? 1 : -1 );
        return mod(COLOR.first_index + week_delta, COLOR.data.length);
    }
    return COLOR.first_index;
};
export { get_print_index_by_date };
