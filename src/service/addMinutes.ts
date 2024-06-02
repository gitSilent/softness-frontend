export function addMinutes(date:Date, minutes:number) {
    date.setMinutes(date.getMinutes() + minutes);
  
    return date.toUTCString();
  }

  export function addMinutesNew(date:Date, minutes:number) {
    return new Date(date.getTime() + minutes * 60000);
  }