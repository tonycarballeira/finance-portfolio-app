export const convertDateToUnixTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000); 
};


export const convertUnixTimestampToDate = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000;
    return new Date(milliseconds).toLocaleDateString();
};

export const createDate = (date, days, weeks, months, years) => {

};