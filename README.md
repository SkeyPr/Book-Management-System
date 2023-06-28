# Book-Management-System

This is a Book Record Management API Server / Backend system

# Fine System

A Book may be borrowed for 3 months at a time
$50/- per extension day

# Subscriptions

3 Months (Basic)
6 Months (Standard)
12 Months (Premium)

# Routes and Endpoints

## /users

POST : Create a new user
GET : Get all user info

## /users/{id}

GET : Get a user by their particular ID
PUT : Update a user by their ID
DELETE : Delete a user by their ID (to check whether they have a book issued already) && (any fine yet to be paid)

## /users/subscription-details/{id}

GET : Get user subscription details >> (Date of Subscription, Validity, Any Fine)

## /books

GET : Get all the books
POST : Create/add a new book

## /books/{id}

GET : Get book by it's particular id
PUT : Update the particular book by id

## /books/issued

GET : Get all issued books

## /books/issued/withFine

GET : Get all issued books with their fine
