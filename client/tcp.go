// This is a demo for messaging between two clients
// It consists of two parts:
// - one that receives messages (called "Server" below)
// - one that sends messages (called "Client" below)
// Every instance of that app has a "Server" and a "Client".
// "Server" is not an actual dispatch server
package main

import (
	"bufio"
	"flag"
	"fmt"
	"log"
	"net"
	"net/rpc"
	"os"
	"strings"
)

// Chat is a server handler type
// It can store some configuration or state data in the future
// Server
type Chat struct {}

// Send is the message handler
// It just prints the message contents
func (c *Chat) Send(msg string, ok *int) error {
	for _, line := range strings.Split(msg, "\n") {
		fmt.Printf("recieved: %s\n", line)
	}
	*ok = 1
	return nil
}

// serve runs server part of this chat
// server part is the part that handles incoming messages
func serve(addr string) {
	s := new(Chat)
	err := rpc.Register(s)
	if err != nil {
		log.Fatal(err)
	}
	//rpc.HandleHTTP()

	// this line runs server part (potentially) infinitely. Well, until error occurs
	l, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalf("error listening: %s", err)
	}
	rpc.Accept(l)
}

func main() {
	clientAddr := flag.String("c", "", "client to connect to")
	listenAddr := flag.String("l", "", "address to listen to")
	flag.Parse()
	go serve(*listenAddr)

	fmt.Println("Start communicating!")

	stdin := bufio.NewReader(os.Stdin)
	msg := strings.Builder{}
	empty := false
	for {
		// read line by line
		line, err := stdin.ReadString('\n')
		if err != nil {
			log.Fatal(err)
		}
		// if two empty lines are entered – send the message
		if line == "\n" {
			if empty {
				client, err := rpc.Dial("tcp", *clientAddr)
				if err != nil {
					log.Fatalf("client error: %s", err)
				}
				// send the message
				err = client.Call("Chat.Send", msg.String(), nil)
				if err != nil {
					log.Fatal(err)
				}
				empty = false
				msg.Reset()
				_ = client.Close()
				continue
			} else {
				empty = true
			}
		} else {
			empty = false
		}
		// add line to a message buffer
		msg.WriteString(line)
	}
}
