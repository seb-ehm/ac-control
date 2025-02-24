package main

import "github.com/seb-ehm/panasonic-comfort-cloud/comfortcloud"

func NeedsLogin(client *comfortcloud.Client) (*comfortcloud.Client, bool) {
	//Check if token file can be used instead of username / password
	err := client.Login()
	if err == nil {
		return client, false
	}
	return nil, true
	//return client, false
}
