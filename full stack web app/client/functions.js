export const getAndDisplayApiData = () =>
  fetch("http://numbersapi.com/1/30/date?json")
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(
        ".cta__description"
      ).innerHTML = `In ${data.text}`;
    });

const createUser = async (body) => {
  let jsonData = JSON.stringify(body);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return await fetch("http://127.0.0.1:3000/users", {
    method: "POST",
    headers,
    body: jsonData,
  });
};

export async function getFormDataAndCreateUser(e) {
  e.preventDefault();

  let password = document.querySelector("#Password").value;
  let email = document.querySelector("#Email").value;
  let selectedUserOption = document.querySelector("#userType");
  let userType =
    selectedUserOption.options[selectedUserOption.selectedIndex].text;

  createUser({ email, password, type: userType })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      alert("data created successfully");
    })
    .catch((err) => alert(err.message))
    .finally(() => {
      document.querySelector("#Password").value = "";
      document.querySelector("#Email").value = "";
    });
}

export const uploadImages = (files) => {
  let formData = new FormData();
  for (let file of files) {
    formData.append("photos", file);
  }

  fetch("http://127.0.0.1:3000/images", {
    method: "POST",
    body: formData,
  }).then(() => alert('images uploaded successfully')).catch(() => alert('failed to upload images'))


};
