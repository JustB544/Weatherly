/** Holds Miscellaneous functions */

/** Converts between to 12 hour time from 24 hour time */

function timeConvert(time){
    if (time[1] === ":"){
        time = "0" + time;
    }
    const hours = Number(time.slice(0, 2));
    const minutes = Number(time.slice(3, 5));
    const beforeNoon = hours < 12;
    if (hours % 12 === 0){
        return `12:${(minutes < 10) ? "0" : ""}${minutes} ${(beforeNoon) ? "am" : "pm"}`;
    }
    return `${(hours % 12 < 10) ? "0" : ""}${hours % 12}:${(minutes < 10) ? "0" : ""}${minutes} ${(beforeNoon) ? "am" : "pm"}`;
}


export {timeConvert};