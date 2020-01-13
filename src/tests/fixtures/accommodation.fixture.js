import faker from 'faker';

const fakerDate1 = faker.date.future(2);
const month1 = (`0${fakerDate1.getMonth() + 1}`).slice(-2);
const date1 = (`0${fakerDate1.getDate()}`).slice(-2);
const formattedDate1 = `${fakerDate1.getFullYear()}-${month1}-${date1}`;
const fakerDate2 = faker.date.future(10);
const month2 = (`0${fakerDate2.getMonth() + 1}`).slice(-2);
const date2 = (`0${fakerDate2.getDate()}`).slice(-2);
const formattedDate2 = `${fakerDate2.getFullYear()}-${month2}-${date2}`;
const booking = {
  from: formattedDate1,
  to: formattedDate2
};

export default booking;
