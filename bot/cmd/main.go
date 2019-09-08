package main

import (
	"errors"
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	"github.com/keybase/go-keybase-chat-bot/kbchat"
	"gopkg.in/yaml.v2"
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
	fmt.Println("Bot is listening for commands.")
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
			handleGroupCommand(kbc, fragments)
		case "data":
			err := handleDataCommand(kbc, fragments[1:])
			if err != nil {
				sendSelfMessage(kbc, fmt.Sprintf("Error parsing command: %s\n", err.Error()))
			}
		default:
			_, err := sendSelfMessage(kbc, fmt.Sprintf("Invalid command: %s\n", command))
			if err != nil {
				alert("Error receiving chat message; %s", err.Error())
			}
		}
	}
}

func handleGroupCommand(kbc *kbchat.API, fragments []string) error {
	if len(fragments) < 2 {
		err := errors.New("Arguments < 2")
		sendSelfMessage(kbc, fmt.Sprintf("Options: add, create, remove, print"))
		return err
	}
	// put everything in /Keybase/private/<user>/.enclave/groups.yaml
	switch fragments[1] {
	case "add":
		sendSelfMessage(kbc, fmt.Sprintf("Add"))
	case "create":
		sendSelfMessage(kbc, fmt.Sprintf("Create"))
	case "remove":
		sendSelfMessage(kbc, fmt.Sprintf("Remove"))
	case "print":
		sendSelfMessage(kbc, fmt.Sprintf("Print"))
	default:
		_, err := sendSelfMessage(kbc, fmt.Sprintf("Invalid command: %s\n", fragments[0]))
		if err != nil {
			alert("Error receiving chat message; %s", err.Error())
		}
	}
	return nil
}

func handleDataCommand(kbc *kbchat.API, fragments []string) error {
	if len(fragments) < 2 {
		err := errors.New("Arguments < 2")
		return err
	}
	switch firstArg := fragments[0]; firstArg {
	case "print":
		fmt.Println("Handling print argument")
		file, err := ReadFile("/keybase/private/sokojoe/.enclave/enclave.yaml")
		if (err != nil) {
			alert("Error reading file; $s", err.Error())
			sendSelfMessage(kbc, fmt.Sprintf("Error reading file: %s\n", err.Error()))
			return nil
		}
		data, err := UnmarshalFile(file)
		if (err != nil) {
			alert("Unmarshal: %v", err)
			sendSelfMessage(kbc, fmt.Sprintf("Error unmarshalling file: %s\n", err.Error()))
			return nil
		}
		fmt.Println(data["lol"])
	case "set":
		fmt.Println("Handling set argument")
	case "unset":
		fmt.Println("Handling unset argument")
	default:
		return errors.New("Argument (" + fragments[0] + ") not recognized.")
	}
	return nil
}

<<<<<<< HEAD
func ReadFile(kbc *kbchat.API, filePath string) []byte {
	yamlFile, err := ioutil.ReadFile("conf.yaml")
	if err != nil {
		alert("Error reading file; $s", err.Error())
		sendSelfMessage(kbc, fmt.Sprintf("Error reading file: %s\n", err.Error()))
=======
func ReadFile(filePath string) ([]byte, error) {
	yamlFile, err := ioutil.ReadFile(filePath)
	if (err != nil) {
		return nil, err
>>>>>>> f0e345f6add4197847119d1d38876054b2c50e85
	}
	return yamlFile, nil
}

<<<<<<< HEAD
func UnmarshalFile(kbc *kbchat.API, yamlFile []byte) map[string]interface{} {
=======
func UnmarshalFile(yamlFile []byte) (map[string]interface{}, error) {
>>>>>>> f0e345f6add4197847119d1d38876054b2c50e85
	m := make(map[string]interface{})
	err := yaml.Unmarshal(yamlFile, &m)
	if (err != nil) {
		return nil, err
	}
	return m, nil
}

type groupsSchema struct {
	Groups map[string][]string `yaml:"groups"`
}
