package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

type File struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

type Directory struct {
	Name     string      `json:"name"`
	Path     string      `json:"path"`
	Files    []File      `json:"files"`
	Subdirs  []Directory `json:"subdirs"`
}

func main() {
	dirPath := "./src/components/"
	directory, err := listDirectory(dirPath)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	jsonData, err := json.MarshalIndent(directory, "", "  ")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

// Open the file for writing
	filePath := "./src/treedir.json"
	file, err := os.Create(filePath)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer file.Close()

	// Write the JSON data to the file
	_, err = file.Write(jsonData)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println(string(jsonData))
}

func listDirectory(dirPath string) (Directory, error) {
	dir := Directory{
		Name:     filepath.Base(dirPath),
		Path:     dirPath,
		Files:    []File{},
		Subdirs:  []Directory{},
	}

	fileErr := filepath.Walk(dirPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if path != dirPath {
			if info.IsDir() {
				subdir, err := listDirectory(path)
				if err != nil {
					return err
				}
				dir.Subdirs = append(dir.Subdirs, subdir)
			} else {
				file := File{
					Name: info.Name(),
					Path: path,
				}
				dir.Files = append(dir.Files, file)
			}
		}

		return nil
	})

	return dir, fileErr
}

