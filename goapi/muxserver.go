package main
 
import (
    "fmt"
    "html"
    "log"
    "net/http"
 
    "github.com/gorilla/mux"
)
 
func main() {
 
    router := mux.NewRouter().StrictSlash(true)
    router.HandleFunc("/", Index)
    fmt.Println("listening on port 9090")
    log.Fatal(http.ListenAndServe(":9090", router))
}
 
func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.URL)
    fmt.Fprintf(w, "Hello using mux, %q", html.EscapeString(r.URL.Path))
}
