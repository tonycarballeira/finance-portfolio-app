export const convertDateToUnixTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000); 
};