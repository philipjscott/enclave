package main

import (
	"flag"
	"fmt"
	"os"
	"strings"

	"github.com/keybase/go-keybase-chat-bot/kbchat"
)

const (
	commandPrefix = '!'
)

func fail(msg string, args ...interface{}) {
	alert(msg, args...)
	os.Exit(3)
}

func alert(msg string, args ...interface{}) {
	fmt.Fprintf(os.Stderr, msg+"\n", args...)
}

func sendSelfMessage(kbc *kbchat.API, msg string) (kbchat.SendResponse, error) {
	username := kbc.GetUsername()
	tlfName := fmt.Sprintf("%s,%s", username, username)
	return kbc.SendMessageByTlfName(tlfName, msg)
}

func main() {
	var kbLoc string
	var kbc *kbchat.API
	var err error

	flag.StringVar(&kbLoc, "keybase", "keybase", "the location of the Keybase app")
	flag.Parse()

	if kbc, err = kbchat.Start(kbchat.RunOptions{KeybaseLocation: kbLoc}); err != nil {
		fail("Error creating API: %s", err.Error())
	}

	if _, err = sendSelfMessage(kbc, "EnclaveBot listening!"); err != nil {
		fail("Error sending message; %s", err.Error())
	}
	if sub, err := kbc.ListenForNewTextMessages(); err != nil {
		fail("Error creating subscription; %s", err.Error())
	} else {
		listen(kbc, sub)
	}
}

func listen(kbc *kbchat.API, sub kbchat.NewSubscription) {
	for {
		msg, err := sub.Read()
		if err != nil {
			alert("Error receiving chat message; %s", err.Error())
		}
		if msg.Message.Content.Text == nil {
			continue
		}
		body := msg.Message.Content.Text.Body
		fragments := strings.Split(body, " ")
		if len(fragments) == 0 {
			continue
		}
		command := fragments[0]
		if command[0] != commandPrefix {
			continue
		}
		command = command[1:]
		switch command {
		case "group":
		case "data":
		default:
			_, err := sendSelfMessage(kbc, fmt.Sprintf("Invalid command: %s\n", command))
			if err != nil {
				alert("Error receiving chat message; %s", err.Error())
			}
		}
	}
}
