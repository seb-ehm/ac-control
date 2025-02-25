package main

import (
	"context"
	"github.com/seb-ehm/panasonic-comfort-cloud/comfortcloud"
	"log/slog"
)

type App struct {
	ctx      context.Context
	username string
	password string
	loggedIn bool
	client   *comfortcloud.Client
	devices  []comfortcloud.Device
}

type Device struct {
	Name        string  `json:"name"`
	IndoorTemp  float32 `json:"indoorTemp"`
	OutdoorTemp float32 `json:"outdoorTemp"`
	Power       bool    `json:"power"`
	SetTemp     float32 `json:"setTemp"`
}

func NewApp() *App {
	return &App{}
}

func (a *App) Login(username, password string) bool {
	a.client = comfortcloud.NewClient(username, password, tokenFile)
	err := a.client.Login()
	if err != nil {
		slog.Error("Login failed: %v", err)
		return false
	}
	a.loggedIn = true
	return true
}

func (a *App) GetDevices() []comfortcloud.Device {
	devices, err := a.client.GetDevices()
	if err != nil {
		slog.Error("Failed to get devices: %v", err)
		return nil
	}
	a.devices = devices
	return devices
}

func (a *App) TogglePower(index int) {
	if index >= 0 && index < len(a.devices) {
		device := a.devices[index]
		var err error
		if device.Parameters.Operate == comfortcloud.PowerOn {
			err = a.client.SetDevice(device.DeviceGuid, comfortcloud.WithPower(comfortcloud.PowerOff))
		} else {
			err = a.client.SetDevice(device.DeviceGuid, comfortcloud.WithPower(comfortcloud.PowerOn))
		}
		if err != nil {
			slog.Error("failed to toggle power: %v", err)
		}
	}
}

func (a *App) AdjustTemperature(index int, delta float64) {
	if index >= 0 && index < len(a.devices) {
		device := a.devices[index]
		err := a.client.SetDevice(device.DeviceGuid, comfortcloud.WithTemperature(device.Parameters.TemperatureSet+delta))
		if err != nil {
			slog.Error("failed to adjust temperature: %v", err)
		}
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	client := comfortcloud.NewClient("", "", tokenFile)
	client, needsLogin := NeedsLogin(client)
	if needsLogin {
		a.loggedIn = false
	} else {
		a.loggedIn = true
		a.client = client
	}
}
