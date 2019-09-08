package main

import (
	"encoding/json"
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
			err := handleGroupCommand(kbc, fragments[1:])
			if err != nil {
				sendSelfMessage(kbc, fmt.Sprintf("Error parsing command: %s\n", err.Error()))
			}
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
		return err
	}

	// Check for groups file, create one if it doesn't exist.
	GROUPS_NAME := "/keybase/private/" + kbc.GetUsername() + "/.enclave/groups.yaml"
	var groupsFile []byte
	groupsFile, err := ReadFile(GROUPS_NAME)
	if err != nil {
		_, _ = CreateFile(GROUPS_NAME)
		groupsFile, err = ReadFile(GROUPS_NAME)
	}
	groupsData, err := UnmarshalFile(groupsFile)
	if err != nil {
		alert("Unmarshal: %v", err)
		sendSelfMessage(kbc, fmt.Sprintf("Error unmarshalling file: %s\n", err.Error()))
		return nil
	}
	fmt.Println(StringifyJSON(groupsData))
	switch fragments[0] {
	case "add":
		sendSelfMessage(kbc, fmt.Sprintf("Add"))
	case "create":
		sendSelfMessage(kbc, fmt.Sprintf("Create"))
	case "remove":
		sendSelfMessage(kbc, fmt.Sprintf("Remove"))
	case "print":
		sendSelfMessage(kbc, fmt.Sprintf(StringifyJSON(groupsData)))
	default:
		return errors.New("Argument (" + fragments[0] + ") not recognized.")
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
		if err != nil {
			alert("Error reading file; $s", err.Error())
			sendSelfMessage(kbc, fmt.Sprintf("Error reading file: %s\n", err.Error()))
			return nil
		}
		data, err := UnmarshalFile(file)
		if err != nil {
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
func StringifyJSON(v interface{}) string {
	bytes, err := json.MarshalIndent(v, "", "  ")
	if err != nil {
		return "error"
	}
	return string(bytes)
}

func ReadFile(filePath string) ([]byte, error) {
	yamlFile, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	return yamlFile, nil
}
func CreateFile(filePath string) (*os.File, error) {
	yamlFile, err := os.Create(filePath)
	if err != nil {
		return nil, err
	}
	return yamlFile, nil
}

func UnmarshalFile(yamlFile []byte) (map[string]interface{}, error) {
	m := make(map[string]interface{})
	err := yaml.Unmarshal(yamlFile, &m)
	if err != nil {
		return nil, err
	}
	return m, nil
}

type groupsSchema struct {
	Groups map[string][]string `yaml:"groups"`
}
