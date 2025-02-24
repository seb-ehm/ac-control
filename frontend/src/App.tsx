import React, { useState, useEffect } from "react";
import {AdjustTemperature, GetDevices, Login, TogglePower} from "../wailsjs/go/main/App";

import "./App.css";
import { Sofa } from "lucide-react";

interface Device {
    name: string;
    indoorTemp: number;
    outdoorTemp: number;
    power: boolean;
    setTemp: number;
}

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [devices, setDevices] = useState<Device[]>([]);
    const [loginError, setLoginError] = useState("");

    useEffect(() => {
        if (loggedIn) {
            fetchDevices();
        }
    }, [loggedIn]);

    const login = async () => {
        const success = await Login(username, password);
        if (success) {
            setLoggedIn(true);
            setLoginError(""); // Clear any previous error message
        } else {
            setLoginError("Invalid credentials. Please try again."); // Set error message
        }
    };

    const fetchDevices = async () => {
        const data: Device[] = await GetDevices();
        setDevices(data);
    };

    const togglePower = async (index: number) => {
        await TogglePower(index);
        fetchDevices();
    };

    const adjustTemperature = async (index: number, delta: number) => {
        await AdjustTemperature(index, delta);
        fetchDevices();
    };


    if (!loggedIn) {
        return (
            <div className="login-container">
                <h1>Login</h1>
                {loginError && <div className="error-message">{loginError}</div>} {/* Display error message */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button onClick={login} className="login-button">Login</button>
            </div>
        );
    }

    return (
        <div className="devices-container">
            <h1>AC Control</h1>
            <div className="device-list">
                {devices.map((device, index) => (
                    <div className="device" key={index}>
                        {/* Device Info */}
                        <div className="device-info">
                            <span className="device-name">{device.name}</span>
                            <div className="temperature-info">
                                <span className="current-temp">🏠 {device.indoorTemp.toFixed(1)}°C</span>
                                <span className="weather-temp">🌤️ {device.outdoorTemp.toFixed(1)}°C</span>
                            </div>
                        </div>

                        {/* Set Temperature Control */}
                        <div className="set-temp-control">
                            <span className="set-temp">Set: {device.setTemp.toFixed(1)}°C</span>
                            <div className="temp-buttons">
                                <button className="temp-button" onClick={() => adjustTemperature(index, 1)}>+</button>
                                <button className="temp-button" onClick={() => adjustTemperature(index, -1)}>-</button>
                            </div>
                        </div>

                        {/* Power Button */}
                        <button
                            className={device.power ? "power-on" : "power-off"}
                            onClick={() => togglePower(index)}
                        >
                            {device.power ? "Turn Off" : "Turn On"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default App;
