export const saveData = (type, data) => {
  let obj = {};
  obj[type] = data;
  chrome.storage.sync.set(obj, function() {
    console.log("Data is updated");
  });
};

export const getDatas = (type, func) => {
  chrome.storage.sync.get(type, func);
};

export const parseDate = date => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const d = new Date(date);
  const day = d.getDate();
  const monthIndex = d.getMonth();
  const year = d.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
};
