/*


RECEIVES:
for example:::::::::::::: "2021-11-08T19:52:53.000000Z"

RETURNS: {

    date: 2021-11-08,
    time: 19:52:53

}

*/

const apiDateToText = (apiDate) => {
  const dateAndTime = apiDate.split("T");
  const date = dateAndTime[0];
  const time = dateAndTime[1].split(".")[0];
  return {
    date: date,
    time: time,
  };
};

export default apiDateToText;
