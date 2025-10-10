const Color_Array = {};

Color_Array.sort_by_date = ( color_arr=[] ) => {
    return color_arr.sort( (a, b) => {
        if( a.first_tuesday.getTime() > b.first_tuesday.getTime()  ){
            return 1;
        }
        if( a.first_tuesday.getTime() < b.first_tuesday.getTime()  ){
            return -1;
        }
        return 0;
    });
};

Color_Array.get_times = ( color_arr= [], now = new Date() ) => {
    color_arr = Color_Array.sort_by_date( color_arr );
    return color_arr.map( (color, i) => {
        return {
            ms: color.first_tuesday.getTime() - now.getTime(),
            i : i,
            color: color
        }
    });
};

Color_Array.get_obj = ( color_arr=[], now = new Date() ) => {
   color_arr = Color_Array.sort_by_date( color_arr );
   return ColorArr.get_times(color_arr, now)
   .filter((time_result)=>{
       return time_result.ms < 0;
   })
   .sort((a, b)=>{
      if(a.ms > b.ms){
          return -1;
      }
      if(b.ms < a.ms){
          return 1;
      }
      return 0;
   })[0].color;
};

export { Color_Array };
