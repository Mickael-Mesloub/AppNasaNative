import Share from 'react-native-share';

/**
 * Reusable functions
 */

// returns date strings at DD-MM-YYYY format
export const formatDate = date => {
  let tempDate = date;
  const day = ('0' + tempDate.getDate()).slice(-2);
  const month = ('0' + (tempDate.getMonth() + 1)).slice(-2);
  const year = tempDate.getFullYear();
  const fullDate = `${year}-${month}-${day}`;
  console.log(`LA FULLDATE DE LA FONCTION = ${fullDate}`);
  return fullDate;
};

// share pictures on social media
export const share = data => {
  const options = {
    message: `Check this out 🤩✨ ! ${data?.title}`,
    url: data?.url,
  };

  Share.open(options)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
};
