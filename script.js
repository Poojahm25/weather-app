
const btn = document.getElementById("searchBtn");
btn.addEventListener("click",getWeather);
async function getWeather(){
    const city=document.getElementById("city").value.trim();
    const apiKey="bdbab08f273f29428ce98b895d425497";
    const loading=document.getElementById("loading");
    const result=document.getElementById("result");

    if(city===""){
      result.innerHTML="Please enter a city name";
      return;
    }
    loading.innerHTML="Fetching data...";
    result.innerHTML="";
    try{
      const response=await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data=await response.json();
      if(data.cod==="404"){
        loading.innerText="";
        result.innerHTML="City not found";
        return;
      }
      loading.innerText="";
      result.innerHTML=`
      <h2>${data.name}</h2>
      <p>Temperature:${data.main.temp}C</p>
      <p>Weather:${data.weather[0].main}</p>
      <p>Humidity:${data.main.humidity}</p>
      `;
    }

    catch(error){
      loading.innerText="";
      result.innerHTML="Something went wrong"
    }
}
document.getElementById("city").addEventListener("keypress", function(e){
  if(e.key==="Enter"){
    getWeather();
  }
});
