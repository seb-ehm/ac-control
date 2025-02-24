package main

import (
	"context"
	"fmt"
	"github.com/seb-ehm/panasonic-comfort-cloud/comfortcloud"
)

type App struct {
	ctx      context.Context
	username string
	password string
	loggedIn bool
	client   *comfortcloud.Client
	devices  []Device
}

type Device struct {
	Name        string  `json:"name"`
	IndoorTemp  float32 `json:"indoorTemp"`
	OutdoorTemp float32 `json:"outdoorTemp"`
	Power       bool    `json:"power"`
	SetTemp     float32 `json:"setTemp"`
}

func NewApp() *App {
	return &App{
		devices: []Device{
			{"Living Room", 22.5, 15.0, true, 23.0},
			{"Bedroom", 21.0, 13.5, false, 22.0},
			{"Office", 24.0, 16.0, true, 24.5},
		},
	}
}

func (a *App) Login(username, password string) bool {
	a.client = comfortcloud.NewClient(username, password, tokenFile)
	err := a.client.Login()
	if err != nil {
		return false
	}
	a.loggedIn = true
	return true
}

func (a *App) GetDevices() []Device {
	return a.devices
}

func (a *App) TogglePower(index int) {
	if index >= 0 && index < len(a.devices) {
		a.devices[index].Power = !a.devices[index].Power
	}
}

func (a *App) AdjustTemperature(index int, delta float32) {
	if index >= 0 && index < len(a.devices) {
		a.devices[index].SetTemp += delta
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	fmt.Println("Starting comfort cloud client")
	client := comfortcloud.NewClient("", "", tokenFile)
	client, needsLogin := NeedsLogin(client)
	if needsLogin {
		a.loggedIn = false
		fmt.Println("Log in needed")
	} else {
		fmt.Println("Log in logged in")
		a.loggedIn = true
		a.client = client
	}
}
