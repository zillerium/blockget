package main

import (
	"bytes"
	"fmt"
	shell "github.com/ipfs/go-ipfs-api"
	webFile "github.com/ipfs/go-ipfs-files"
	"io/ioutil"
	"net/url"
)

func main() {

	sh := shell.NewShell("localhost:5001")
	u, _ := url.Parse("https://www.kdc.org.uk/wp-content/uploads/file/Insurance.pdf")
	wf := webFile.NewWebFile(u)
	defer wf.Close()

	b, _ := ioutil.ReadAll(wf)

	in := bytes.NewReader(b)

	cid, err := sh.Add(in)
	if err != nil {
		fmt.Printf("\nerror: %s", err)
	}

	fmt.Printf("\ncid: %s", cid)
}
