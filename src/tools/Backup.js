const getDateString = () => {
  const date = new Date().toString();
  const parts = date.split("GMT")[0];
  return parts.replace(/:/g, "-").trim();
};

export const exportData = (data) => {
  const blob = new Blob([JSON.stringify(data, undefined, 4)], {
    type: "text/json",
  });
  const e = document.createEvent("MouseEvents");
  const a = document.createElement("a");

  a.download = `backup elze ${getDateString()}.json`;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  e.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
};

export const importData = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
};
