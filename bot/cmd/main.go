package main

import (
	"flag"
	"fmt"
	"os"
	"strings"
	"errors"
	"io/ioutil"

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
		case "data":
			success, err := handleDataCommand(kbc, fragments[1:])
			if err != nil {
				sendSelfMessage(kbc, fmt.Sprintf("Error: %s\n", err.Error()))
			} else {
				sendSelfMessage(kbc, fmt.Sprintf("Success: %s", success))
			}
		default:
			_, err := sendSelfMessage(kbc, fmt.Sprintf("Invalid command: %s\n", command))
			if err != nil {
				alert("Error receiving chat message; %s", err.Error())
			}
		}
	}
}

func handleGroupCommand(kbc *kbchat.API, fragments []string) {
	if len(fragments) < 2 {
		
	}
	// put everything in /Keybase/private/<user>/.enclave/groups.

}

func handleDataCommand(kbc *kbchat.API, fragments []string) (string, error){
	if len(fragments) < 2 {
		err := errors.New("Arguments < 2");
		return "", err
	}
	switch firstArg:= fragments[0]; firstArg {
	case "print": 
		fmt.Println("Handling print argument")
		var filePath = fmt.Sprintf("/keybase/private/sokojoe#%s/.enclave/enclave.yaml", fragments[1])
		file, err := ReadFile(filePath)
		if (err != nil) {
			alert("Error reading file; $s", err.Error())
			return "", errors.New(fmt.Sprintf("File %s does not exist", filePath))
		}
		sendSelfMessage(kbc, fmt.Sprintf("%s",  "```\n" + string(file) + "```"))
	case "set":
		if len(fragments) < 4 {
			err := errors.New("Arguments < 4");
			return "", err
		}
		var filePath = fmt.Sprintf("/keybase/private/sokojoe#%s/.enclave/enclave.yaml", fragments[2])
		fmt.Println("Handling set argument")
		file, err := ReadFile(filePath)
		if (err != nil) {
			alert("Error reading file; $s", err.Error())
			return "", errors.New(fmt.Sprintf("File %s does not exist", filePath))
		}
		data, err := UnmarshalFile(file)
		if (err != nil) {
			alert("Unmarshal: %v", err)
			return "", errors.New(fmt.Sprintf("File %s is not a valid yaml file", filePath))
		}
		data[fragments[3]] = fragments[4]

		bytes, err := MarshalFile(data)
		if (err != nil) {
			return "", errors.New(fmt.Sprintf("Error marshalling file"))
		}

		err = WriteFile(filePath, bytes)
		if (err != nil) {
			return "", errors.New(fmt.Sprintf("Could not write to file %s", filePath))
		}

		return "Variable was set!", nil
		
	case "unset":
		fmt.Println("Handling unset argument")
	default:
		return "", errors.New("Argument (" + fragments[0] + ") not recognized.")
	}
	return "", nil
}

func ReadFile(filePath string) ([]byte, error) {
	yamlFile, err := ioutil.ReadFile(filePath)
	if (err != nil) {
		return nil, err
	}
	return yamlFile, nil
}

func WriteFile(filePath string, data []byte) (error) {
	err := ioutil.WriteFile(filePath, data, 0644)
	return err
}

func UnmarshalFile(yamlFile []byte) (map[string]interface{}, error) {
	m := make(map[string]interface{})
	err := yaml.Unmarshal(yamlFile, &m)
	if (err != nil) {
		return nil, err
	}
	return m, nil
}

func MarshalFile(bytes map[string]interface{}) ([]byte, error) {
	data, err := yaml.Marshal(bytes)
	if (err != nil) {
		return nil, err
	}
	return data, nil
}

type groupsSchema struct {
	Groups map[string][]string `yaml:"groups"`
}
