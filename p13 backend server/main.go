package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type User struct {
	FirstName   string `json:"firstName" binding:"required,min=3"`
	LastName    string `json:"lastName" binding:"required,min=3"`
	Email       string `json:"email" binding:"required,email"`
	Gender      string `json:"gender" binding:"required"`
	DateOfBirth string `json:"dateOfBirth" binding:"required"`
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:5500"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "server is running",
		})
	})

	r.POST("/register", func(c *gin.Context) {
		var user User

		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Invalid request data",
				"error":   err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "User registered successfully",
			"user":    user,
		})
	})

	r.Run(":8080")
}
