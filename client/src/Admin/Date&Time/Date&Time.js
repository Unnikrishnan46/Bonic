const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth()+1;
const day = currentDate.getDate();


const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();


const formattedDate = `${day}/${month}/${year}`;
const formattedTime = `${hours}:${minutes}:${seconds}`

export {formattedDate,formattedTime}