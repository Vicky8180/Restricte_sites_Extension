

export const addToBlocklist = async (newUrl: string) => {
  const blocklist = await getBlocklist();
  if (!blocklist.includes(newUrl)) {
    blocklist.push(newUrl);
    chrome.storage.local.set({ blocklist }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'blocklistUpdated', blocklist });
      });
    });
  }
};

export const removeFromBlocklist = async (urlToRemove: string) => {
  const blocklist = await getBlocklist();
  const newBlocklist = blocklist.filter(url => url !== urlToRemove);
  chrome.storage.local.set({ blocklist: newBlocklist }, () => {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'blocklistUpdated', blocklist: newBlocklist });
    });
  });
};

export const getBlocklist = (): Promise<string[]> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["blocklist"], (result) => {
      resolve(result.blocklist || []);
    });
  });
};
