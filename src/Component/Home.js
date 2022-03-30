import React, { useState, useEffect } from "react";
import "../App.css";
import { Dropdown, Selection } from 'react-dropdown-now';
function Home() {
  const [data, setData] = useState([]);
  const [health, sethealth] = useState("");
  const [emotions, setemotions] = useState("");
  const [personal_life, setpersonal_life] = useState("");
  const [profession, setprofession] = useState("");
  const [travel, settravel] = useState("");
  const [luck, setluck] = useState("");
    const [name, setName] = useState("");
  const [nex, setinex] = useState(0);


  const change = (item) =>{
    const url =
      "http://139.59.94.54/kundali_expert/astrology_api/daily_sun_sign_prediction";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "1",
        lang: item.value == "English"? "en":"hi" ,
        timezone: "5.5",
        zodiacSign: name,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // this.hideLoading()

        if (responseJson.status == true) {
          sethealth(responseJson.responseData.prediction.health);
          setemotions(responseJson.responseData.prediction.emotions);
          setpersonal_life(responseJson.responseData.prediction.personal_life);
          setprofession(responseJson.responseData.prediction.profession);
          settravel(responseJson.responseData.prediction.travel);
          setluck(responseJson.responseData.prediction.luck);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
        // this.hideLoading()
      });
  }

  useEffect(() => {
    const url = "https://astrohelp24.com:5030/api/fetch_horoscopes";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: "1",
        lon: "1",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == true) {
          setData(responseJson.data);
          click(responseJson.data[0]);
        } else {
        }
      })
      .catch((error) => {
        //  this.hideLoading()
        console.error(error);
      });
  }, []);


  const click = (item) => {
  setinex(item.vh)
  setName(item.name)
    const url =
      "http://139.59.94.54/kundali_expert/astrology_api/daily_sun_sign_prediction";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "1",
        lang: "en",
        timezone: "5.5",
        zodiacSign: item.name,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // this.hideLoading()

        if (responseJson.status == true) {
          sethealth(responseJson.responseData.prediction.health);
          setemotions(responseJson.responseData.prediction.emotions);
          setpersonal_life(responseJson.responseData.prediction.personal_life);
          setprofession(responseJson.responseData.prediction.profession);
          settravel(responseJson.responseData.prediction.travel);
          setluck(responseJson.responseData.prediction.luck);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
        // this.hideLoading()
      });
  };

  function Item(props) {

    return (
      <div style={{ display: "inline-block", margin: 6 ,
    }}>
        <div onClick={() => click(props)}>

        {nex == props.vh && (
          <img
            src={props.value.imageUrl}
            width="90"
            height="90"
            overflow = 'hidden'
            backgroundColor= "red"

          borderRadius= '50%'
          />
        )}

        {nex != props.vh && (
          <img
            src={props.value.imageUrl}
            width="80"
            height="80"
            borderRadius="40"
          />
        )}

          <p className="font-face-gm" style={{ color: "black", textAlign: "center" }}>
            {props.value.name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data.map((item,index) => (
        <Item key={item.id} value={item} vh={index} />
      ))}
      <div style = {{backgroundColor:'#f1f1f1'}}>
      <Dropdown style = {{margin:"10px"}}
        placeholder="Select Language"
        className="my-className"
        options={['English', 'Hindi']}
        value="Select an option"
        onChange={(value) => change(value)}
        onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
        onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
        onOpen={() => console.log('open!')}
      />
      </div>
      <h1 className="font-face-gm" >Health </h1>
      <p className="font-face-gr">{health}</p>
      <h1 className="font-face-gm">Emotions </h1>
      <p className="font-face-gr">{emotions}</p>
      <h1 className="font-face-gm">Personal Life </h1>
      <p className="font-face-gr">{personal_life}</p>
      <h1 className="font-face-gm">Profession </h1>
      <p className="font-face-gr">{profession}</p>
      <h1 className="font-face-gm">Travel </h1>
      <p className="font-face-gr">{travel}</p>
      <h1 className="font-face-gm"> Luck</h1>
      <p className="font-face-gr">{luck}</p>
    </div>
  );
}

export default Home;
