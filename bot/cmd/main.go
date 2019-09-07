package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/keybase/go-keybase-chat-bot/kbchat"
)

func fail(msg string, args ...interface{}) {
	alert(msg, args...)
	os.Exit(3)
}

func alert(msg string, args ...interface{}) {
	fmt.Fprintf(os.Stderr, msg+"\n", args...)
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

	username := kbc.GetUsername()
	tlfName := fmt.Sprintf("%s,%s", username, username)
	if _, err = kbc.SendMessageByTlfName(tlfName, "EnclaveBot listening!"); err != nil {
		fail("Error sending message; %s", err.Error())
	}
	if sub, err := kbc.ListenForNewTextMessages(); err != nil {
		fail("Error creating subscription; %s", err.Error())
	} else {
		listen(sub)
	}
}

func listen(sub kbchat.NewSubscription) {
	for {
		msg, err := sub.Read()
		if err != nil {
			alert("Error receiving chat message; %s", err.Error())
		}
		fmt.Println(msg.Message.Content.Text.Body)
	}
}
