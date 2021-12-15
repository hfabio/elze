const getDateString = () => {
  const date = new Date().toString();
  const parts = date.split("GMT")[0];
  return parts.replace(/:/g, "-").trim();
};

const getCsvData = data => {
  const headers = Object.keys(data[0]);
  console.log({headers, data});
  const rows = [
    headers.map(e => `${e.charAt(0).toUpperCase()}${e.slice(1)}`), 
    ...data.map(element => headers.reduce((acc, curr) => [...acc, element[curr] || ''], []))
  ];
  console.log({rows});
  return rows.map(e => `"${e.join('";"')}"`).join('\n');
}

export const exportDataJson = (data) => {
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

export const exportDataCsv = (data) => {
  const blob = new Blob([getCsvData(data)], {
    type: "text/csv",
  });
  const e = document.createEvent("MouseEvents");
  const a = document.createElement("a");

  a.download = `backup elze ${getDateString()}.csv`;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/csv", a.download, a.href].join(":");
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
