package main

import (
 	 "net"
  	"fmt"
	"bytes"
//	"io/ioutil"
	"reflect"
	shell "github.com/ipfs/go-ipfs-api"
//	webFile "github.com/ipfs/go-ipfs-files"

)

func handleConnection(conn net.Conn, sh *shell.Shell) {
  	// try to read data from the connection
  	data := make([]byte, 8192)
  	n, err := conn.Read(data)
  	if err != nil { panic(err)  }
  	//s := string(data[:n])

  // print the request data
  //	fmt.Println(s)
//	s := bytes(data[:n])
xx := bytes.NewReader(data[:n])
//fmt.Println(xx)

cid, err := sh.Add(xx)
	if err != nil {
		fmt.Printf("\nerr: %s", err)
	 } else {
		 fmt.Printf("\ncid: %s", cid)
	 }


  	// send a response
  	var str = []string{cid}
  	var x = []byte{}
  	// convert string array to byte array so it can
  	// be written to the connection
  	for i:=0; i<len(str); i++{
    	b := []byte(str[i])
    	for j:=0; j<len(b); j++{
      	x = append(x,b[j])
   	 }
  	}
	fmt.Println("sending data back")
 	 // write the data to the connection
  	_, err = conn.Write(x)
  	if err != nil { fmt.Println("error", err) }
  	// close the connection
	fmt.Println("closing")

  	conn.Close()
}

func main() {
 	ln, err := net.Listen("tcp", ":3002")
 	fmt.Println("Listening on server 3002")
  	sh := shell.NewShell("localhost:5001")
	fmt.Println("Listening on server 5001")
	fmt.Println(reflect.TypeOf(sh))
  	if err != nil {
    // handle error
  	}
  	for {
    		conn, err := ln.Accept()
    		if err != nil {
      			// handle error
      			continue
		}
    		go handleConnection(conn, sh)
  	}
}
