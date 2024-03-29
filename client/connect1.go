package main

import (
        "bufio"
        "fmt"
        "log"
        "net"
        "sync"
)

// Client is a basic client to the NATS server.
type Client struct {
        conn net.Conn
        w    *bufio.Writer
        sync.Mutex
}

// NewClient returns a NATS client.
func NewClient() *Client {
        return &Client{}
}

// Connect establishes a connection to a NATS server.
func (c *Client) Connect(netloc string) error {
        conn, err := net.Dial("tcp", netloc)
        if err != nil {
                return err
        }
        c.conn = conn
        c.w = bufio.NewWriter(conn)

        return nil
}

// Publish takes a subject as an immutable string and payload in bytes,
// then sends the message to the server.
func (c *Client) Publish(subject string, payload []byte) error {
        c.Lock()
        pub := fmt.Sprintf("PUB %s %d\r\n", subject, len(payload))
        _, err := c.w.WriteString(pub)
        if err == nil {
                _, err = c.w.Write(payload)
        }
        if err == nil {
                _, err = c.w.WriteString("\r\n")
        }
        if err == nil {
                err = c.w.Flush()
        }
        c.Unlock()
        if err != nil {
                return err
        }

        return nil
}

// Close terminates a connection to NATS.
func (c *Client) Close() {
        c.Lock()
        defer c.Unlock()
        c.conn.Close()
}

func main() {
        nc := NewClient()
        err := nc.Connect("127.0.0.1:4222")
        if err != nil {
                log.Fatalf("Error: %s", err)
        }
        defer nc.Close()

        err = nc.Publish("hello", []byte("world"))
        if err != nil {
                log.Fatalf("Error: %s", err)
        }
}
