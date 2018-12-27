export const saveData = (type, data) => {
  let obj = {};
  obj[type] = data;
  chrome.storage.sync.set(obj, function() {
    console.log('Data is updated');
  });
};

export const getDatas = (type, func) => {
  chrome.storage.sync.get(type, func);
};

