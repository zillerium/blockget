package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"encoding/json"
	"github.com/gorilla/mux"
)

type Article struct{
	ID	string `json:id`
	Title string `json:"title"`
	Desc string `json:"desc"`
	Content string `json:"content"`
}

var Articles []Article

func allArticles(w http.ResponseWriter, r *http.Request) {
//	articles := Articles {
//		Article{Title:"new title", Desc: "test desc", Content: "hello world"},
//	}
//	fmt.Fprintf(w, "All articles endpoint")
//	json.NewEncoder(w).Encode(articles)
}

func addArticle (w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var newArticle Article
	json.NewDecoder(r.Body).Decode(&newArticle)
	newArticle.ID = strconv.Itoa(len(Articles)+1)
	Articles = append(Articles, newArticle)
	json.NewEncoder(w).Encode(newArticle)
}

func getArticle (w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Println("getarticle")
	params := mux.Vars(r)
	for _, item := range Articles {
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
	myRouter.HandleFunc("/getArticle/{id}", getArticle).Methods("GET")
	myRouter.HandleFunc("/addArticle", addArticle).Methods("POST")
	log.Fatal(http.ListenAndServe(":9090", myRouter))

}

func main() {
	handleRequests()
}
