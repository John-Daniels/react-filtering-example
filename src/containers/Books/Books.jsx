import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import "./Books.scss"
import useBooks from "../../graphql/hooks/useBooks"
import BookCard from "../../components/BookCard"
import { CircularProgress } from "@mui/material"

// fake data for debugging
const _books = [
  {
    title: "Grapql course",
    author: "John Daniels",
    id: "2131241241241231212312312",
    desc: "A book talking about graphql",
    categories: ["Graphql", "Nodejs", "All"],
  },
  {
    title: "Grapql course",
    author: "John Daniels",
    id: "2131241241241231212312312",
    desc: "A book talking about Graphql",
    categories: ["Graphql", "Nodejs", "All"],
  },
  {
    title: "Grapql course",
    author: "John Daniels",
    id: "2131241241241231212312312",
    desc: "A book talking about Graphql",
    categories: ["Graphql", "Nodejs", "All"],
  },
  {
    title: "Grapql course",
    author: "John Daniels",
    id: "2131241241241231212312312",
    desc: "A book talking about Graphql",
    categories: ["Graphql", "Nodejs", "All"],
  },
]

const Books = () => {
  const [activeFilter, setActiveFilter] = useState("All")
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  //some animation
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 })

  const { data, error, loading } = useBooks()

  useEffect(() => {
    if (data) {
      setBooks(data.books)
      setFilteredBooks(data.books)
    }
  }, [data])

  const handleBookFilter = (filter) => {
    setActiveFilter(filter)
    setAnimateCard([{ y: 80, opacity: 0 }])

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }])
    }, 500) // to make the animation slick

    if (filter === "All") setFilteredBooks(books)
    else {
      // return all the books at have that particular filter
      const filters = books.filter(({ categories }) =>
        categories.includes(filter)
      )
      setFilteredBooks(filters)
    }
  }

  const renderBooks = () =>
    Object.keys(filteredBooks).length > 0 ? (
      filteredBooks.map((book, index) => <BookCard book={book} key={index} />)
    ) : (
      <div>Nothing here for now!</div>
    )

  return (
    <div id='books' className='app__flex'>
      <motion.div
        animate={{ x: [50, 0], opacity: [0, 1] }}
        transition={{ duration: 1, ease: "easeIn" }}
        style={{ marginTop: "2rem" }}
      >
        <h2 className='head-text' style={{ padding: 10 }}>
          Data Filtering Example with <span>Reactjs</span> by
          <small> JohnKoder</small>
        </h2>
      </motion.div>

      <div className='app__books'>
        <div className='app__book-filter app__flex'>
          {["All", "Nodejs", "Graphql", "Reactjs", "Dativejs", "Flutter"].map(
            (filter, index) => (
              <div
                className={`app__book-filter-item app__flex p-text ${
                  activeFilter === filter ? "item-active" : ""
                }`}
                key={index}
                onClick={() => handleBookFilter(filter)}
              >
                {filter}
              </div>
            )
          )}
        </div>

        <motion.div
          animate={animateCard}
          transition={{ duration: 0.2, delayChildren: 0.5 }}
          className='app__book-list'
        >
          {loading ? (
            <div
              className='app__flex app__notifier'
              animate={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.2 }}
            >
              <CircularProgress />
              <p className='p-text'>fetching some data</p>
            </div>
          ) : error ? (
            <motion.div
              className='app__flex app__notifier'
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 1 }}
            >
              Something went wrong!
            </motion.div>
          ) : (
            renderBooks()
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Books
