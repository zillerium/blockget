package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strconv"

	"github.com/gorilla/mux"
	shell "github.com/ipfs/go-ipfs-api"
	webFile "github.com/ipfs/go-ipfs-files"

		"net"
	"github.com/blockget-grpc/audit/auditpb"
	"google.golang.org/grpc"
)

type server struct{}

type BitData struct {
	ID      string `json:id`
	Url     string `json:"url"`
	Account string `json:"account"`
	CID     string `json:"cid"`
}

var BitDataArray []BitData

func (*server) Audit(ctx context.Context, req *auditpb.AuditRequest) (*auditpb.AuditResponse, error) {
	fmt.Printf("audit was invoked by %v ", req)

	hashcode := req.GetMsg().GetHashcode()
	account := req.GetMsg().GetAccount()
	result := "hashcode " + hashcode + " " + account
	res := &auditpb.AuditResponse{
		Result: result,
	}
	return res, nil
}

func allArticles(w http.ResponseWriter, r *http.Request) {
	//	articles := Articles {
	//		Article{Title:"new title", Desc: "test desc", Content: "hello world"},
	//	}
	//	fmt.Fprintf(w, "All articles endpoint")
	//	json.NewEncoder(w).Encode(articles)
}

func addBitData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var newBitData BitData
	json.NewDecoder(r.Body).Decode(&newBitData)
	newBitData.ID = strconv.Itoa(len(BitDataArray) + 1)
	BitDataArray = append(BitDataArray, newBitData)
	storeBTFS(&newBitData)
	json.NewEncoder(w).Encode(newBitData)
	// demo code only
	// add nft record via gRPC call to Java NFT code
}

func getBitData(w http.ResponseWriter, r *http.Request) {
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
	// listen on one thread only
	//log.Fatal(http.ListenAndServe(":9090", myRouter))

	// withinsecure for testing only - add ssl later

	     lis, errs := net.Listen("tcp", "0.0.0.0:50051")
	     if errs !=nil {
	              log.Fatalf("failed to listen %w", errs)
	      }
	       s :=grpc.NewServer()
	       auditpb.RegisterAuditServiceServer(s, &server{})
	       if err:=s.Serve(lis); err !=nil {
	               log.Fatalf("failed to serve %w", err)

		}

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
