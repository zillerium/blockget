package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"encoding/json"
	"github.com/gorilla/mux"
        "bytes"
        shell "github.com/ipfs/go-ipfs-api"
        webFile "github.com/ipfs/go-ipfs-files"
        "io/ioutil"
        "net/url"
)

type BitData struct{
	ID	string `json:id`
	Url string `json:"url"`
	Account string `json:"account"`
	CID string `json:"cid"`
}

var BitDataArray []BitData

func allArticles(w http.ResponseWriter, r *http.Request) {
//	articles := Articles {
//		Article{Title:"new title", Desc: "test desc", Content: "hello world"},
//	}
//	fmt.Fprintf(w, "All articles endpoint")
//	json.NewEncoder(w).Encode(articles)
}

func addBitData(w http.ResponseWriter, r *http.Request){
        w.Header().Set("Content-Type", "application/json")
        var newBitData BitData
        json.NewDecoder(r.Body).Decode(&newBitData)
        newBitData.ID = strconv.Itoa(len(BitDataArray)+1)
        BitDataArray = append(BitDataArray, newBitData)
	storeBTFS(&newBitData)
        json.NewEncoder(w).Encode(newBitData)
}


func getBitData (w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Println("getarticle")
	params := mux.Vars(r)
	for _, item := range BitDataArray {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage endpoint")


}

func handleRequests() {
      //  articles := Articles {
//		Article{ID: "1", Title:"new title", Desc: "test desc", Content: "hello world"},
  //      }

	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", homePage)
//	myRouter.HandleFunc("/storebtfs", storeBTFS)
	myRouter.HandleFunc("/getBitData/{id}", getBitData).Methods("GET")
	myRouter.HandleFunc("/addBitData", addBitData).Methods("POST")
	log.Fatal(http.ListenAndServe(":9090", myRouter))

}

func storeBTFS(bd *BitData) {

	myurl := bd.Url
	 fmt.Printf("\nurl: %s", myurl)

	sh := shell.NewShell("localhost:5001")
	u, _ := url.Parse(myurl)
	wf := webFile.NewWebFile(u)
	defer wf.Close()

	b, _ := ioutil.ReadAll(wf)

	in := bytes.NewReader(b)

	cid, err := sh.Add(in)
	if err != nil {
		fmt.Printf("\nerror: %s", err)
	 } else {
		bd.CID = cid
	 }

	fmt.Printf("\ncid: %s", cid)
}





func main() {
	handleRequests()
}
