import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams, json, useNavigate } from "react-router-dom";
import WeatherApi from "./api";
import './LocationDetail.css';
import LocationDetailGrid from "./LocationDetailGrid";
import LocationDetailBox from "./LocationDetailBox";
import { useLocalStorage } from "./hooks";
import TimeContext from "./TimeContext";
import SettingsContext from "./SettingsContext";
import 'font-awesome/css/font-awesome.min.css';

function LocationDetail(){
    const forecast = useLoaderData();
    const {settings, setSettings, isDesktop} = useContext(SettingsContext);
    const {time} = useContext(TimeContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(forecast);
    }, []);

    if (Object.keys(forecast).length === 0){
        return <p>Loading &hellip;</p>;
    }

    return (
        <div className="LocationDetailBackground">
            <div className="LocationDetail">
                <div className="LocationDetailLeft">
                    <div><i className="fa fa-arrow-left LocationDetailArrowLeft" style={{float: "left", width: "21px"}} onClick={() => navigate("/")}></i></div>
                    <span><img style={{width: "200px"}} src={forecast.current.condition.icon.replace("64x64", "128x128")} alt={forecast.current.condition.text}/></span>
                    <h3 style={{fontSize: "96px", fontWeight: 300, margin: "10px 0px 0px 0px"}}>{forecast.current[`temp_${settings.temperature}`]}°{settings.temperature.toUpperCase()}</h3>
                    <h4 style={{fontSize: "20px", margin: 0}}>{forecast.current.condition.text}</h4>
                    <hr style={{color: "#eeeeee", width: "80%", margin: "30px 0px 50px 10%"}}/>
                    <h4 style={{fontSize: "16px", color: "#6D6D6D", margin: "0 0 10px 0"}}>{Intl.DateTimeFormat("en-US", {timeZone: forecast.location.tz_id, day: "numeric", month: "long", year: "numeric"}).format(time)}</h4>
                    <h4 style={{fontSize: "20px", fontWeight: 600, margin: "0"}}>{Intl.DateTimeFormat("en-US", {timeZone: forecast.location.tz_id, weekday: "long", hour: "numeric", minute: "numeric"}).format(time)}</h4>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}><h3 style={{fontSize: "48px", fontWeight: 300, margin: "0"}}>{forecast.location.name}</h3></div>
                </div>
                <div className="LocationDetailRight">
                    <div className="LocationDetailRightHeader">
                        <h3 className="LocationDetailCurrentTab">Today</h3>
                        <h3 className="LocationDetailTab">Forecast</h3>
                        <h3 className="LocationDetailTab">History</h3>
                    </div>
                    <LocationDetailGrid height={3} width={3}>
                        <LocationDetailBox>
                            <p className="LocationDetailBoxTitle">Wind</p>
                            <h3 className="LocationDetailBoxValueBig">{forecast.current[`wind_${settings.speed}`]} {settings.speed}</h3>
                            <p style={{fontSize: "20px", margin: 0, width: "100%", textAlign: "left"}}>{forecast.current.wind_dir}</p>
                        </LocationDetailBox>
                        <LocationDetailBox>
                            <p className="LocationDetailBoxTitle">Humidity</p>
                            <h3 className="LocationDetailBoxValueBig">{forecast.current.humidity}%</h3>
                        </LocationDetailBox>
                        <LocationDetailBox>
                            <p className="LocationDetailBoxTitle">Feels like</p>
                            <h3 className="LocationDetailBoxValueBig">{forecast.current[`feelslike_${settings.temperature}`]}°{settings.temperature.toUpperCase()}</h3>
                        </LocationDetailBox>
                        <LocationDetailBox>
                            <p className="LocationDetailBoxTitle">UV index</p>
                            <h3 className="LocationDetailBoxValueBig">{forecast.current.uv}</h3>
                        </LocationDetailBox>
                        <LocationDetailBox>
                            <p className="LocationDetailBoxTitle">Pressure</p>
                            <h3 className="LocationDetailBoxValueBig">{forecast.current[`pressure_${settings.pressure}`]} {settings.pressure}</h3>
                        </LocationDetailBox>
                        <LocationDetailBox>
                            <p className="LocationDetailBoxTitle">Chance of precipitation</p>
                            <h3 className="LocationDetailBoxValueBig">{forecast.forecast.forecastday[0].day.daily_chance_of_rain}%</h3>
                        </LocationDetailBox>
                        <LocationDetailBox>
                            <p className="LocationDetailBoxTitle">Temperature History</p>
                            <h3 className="LocationDetailBoxValueSmall"><i className="fa fa-arrow-up" style={{color: "#fdacab", width: "21px"}}></i> {forecast.forecast.forecastday[0].day[`maxtemp_${settings.temperature}`]}°{settings.temperature.toUpperCase()}</h3>
                            <h3 className="LocationDetailBoxValueSmall"><i className="fa fa-arrow-down" style={{color: "#b0fdd3", width: "21px"}}></i> {forecast.forecast.forecastday[0].day[`mintemp_${settings.temperature}`]}°{settings.temperature.toUpperCase()}</h3> 
                        </LocationDetailBox>
                        <LocationDetailBox>
                            <p className="LocationDetailBoxTitle">Sun</p>
                            <h3 className="LocationDetailBoxValueSmall"><span className="LocationDetailRiseSet">Rise</span> {forecast.forecast.forecastday[0].astro.sunrise}</h3>
                            <h3 className="LocationDetailBoxValueSmall"><span className="LocationDetailRiseSet">Set</span> {forecast.forecast.forecastday[0].astro.sunset}</h3>
                        </LocationDetailBox>
                        <LocationDetailBox>
                            <p className="LocationDetailBoxTitle">Cloud cover</p>
                            <h3 className="LocationDetailBoxValueBig">{forecast.current.cloud}%</h3>
                        </LocationDetailBox>
                    </LocationDetailGrid>
                </div>
            </div>
        </div>
    );
}

const locationDetailLoader = async ({params}) => json(await WeatherApi.getForecast(params.location), {status: 200});


export default LocationDetail;
export {locationDetailLoader};