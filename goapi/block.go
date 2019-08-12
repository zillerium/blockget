package main

import "time"

type Block struct {
	Content      string    `json:"content"`
}

type Blocks []Block
