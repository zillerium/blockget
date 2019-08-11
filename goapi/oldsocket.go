package main

import "net"
import "fmt"
import "io/ioutil"
import "reflect"
//import "bufio"
//import "strings" // only needed below for sample processing

func main() {

  fmt.Println("Launching server...")
  conn, err := net.Dial("tcp", "127.0.0.1:3001")
  if err != nil {
	  fmt.Println("error")
  }
  // listen on all interfaces
//  ln, _ := net.Listen("tcp", ":3001")

  // accept connection on port
  //conn, _ := ln.Accept()
  // buf := make([]byte, 0, 8192) 
  //tmp := make([]byte, 8192);
  // run loop forever (or until ctrl-c)
  for {
    // will listen for message to process ending in newline (\n)
  //  message, _ := bufio.NewReader(conn).ReadString('\n')
  mess, err1 := ioutil.ReadAll(conn)
  if err1 != nil {
          fmt.Println("error")
  }

    	fmt.Println(reflect.TypeOf(mess))
     defer conn.Close()
     domain := "test"
    fmt.Fprintf(conn, "%s", domain);
   // return ioutil.ReadAll(conn)
   // buf = append(buf, tmp[:conn])
  //  fmt.Println("total size:", len(buf))
    break
    // output message received
    //fmt.Print("Message Received:", string(message))
    // sample process for string received
    //newmessage := strings.ToUpper(message)
    // send new string back to client
   // conn.Write([]byte(newmessage + "\n"))
  }
}
