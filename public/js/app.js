const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#message1");
const msg2 = document.querySelector("#message2");
const msg3 = document.querySelector("#message3");
const msg4 = document.querySelector("#message4");
const msg5 = document.querySelector("#message5");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  msg1.textContent = "";
  msg2.textContent = "Loading..";
  msg3.textContent = "";
  msg4.textContent = "";
  msg5.textContent = "";
  fetch(`/weather?address=${search.value}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msg2.textContent = data.error;
        } else {
          if (!data.city) {
            msg3.textContent = data.county;
            console.log(data);
          } else {
            msg3.textContent = data.city;
          }
          msg5.textContent = data.country;
          msg1.textContent = data.temperature;
          msg4.textContent = "Rain";
          msg2.textContent = data.precipitation;
        }
      });
    }
  );
  console.log(search.value);
});
