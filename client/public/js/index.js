const url = "http://localhost:5000/";
const inputForm = document.querySelector("#locForm");
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(inputForm);
  const formDataSerialized = Object.fromEntries(formData);
  const jsonObject = { ...formDataSerialized };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonObject),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!(typeof data.temprature === "undefined")) {
        document.getElementById(
          "temprature"
        ).innerHTML = `${data.temprature} °C`;
        document.getElementById(
          "location"
        ).innerHTML = `${data.cityname}  ${data.countryname}`;
        document.getElementById(
          "weatherType"
        ).innerHTML = `${data.description}`;
      } else {
        if (data.cod === "404") alert("City not found");
        else if (data.cod === "400") alert("Pls mention city");
        window.location.reload();
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});
