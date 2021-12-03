export const clear = () => {
  localStorage.clear();
};
export const rehidrate = () => {
  let data = localStorage.getItem("elze");
  return data ? JSON.parse(data) : false;
};
export const dehidrate = (data) => {
  if (!data) clear();
  localStorage.setItem(
    "elze",
    JSON.stringify({
      lastUpdate: new Date().toISOString(),
      data,
    })
  );
};

const hydration = {
  rehidrate,
  dehidrate,
  clear,
};

export default hydration;
