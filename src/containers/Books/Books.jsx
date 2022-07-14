import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AiFillEye } from "react-icons/ai"
import "./Books.scss"
import useBooks from "../../graphql/hooks/useBooks"

// fake data
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
    setAnimateCard([{ y: 150, opacity: 0 }])

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
      <h2 className='head-text' style={{ padding: 10 }}>
        Data Filtering Example with <span>Reactjs</span> by
        <small> JohnKoder</small>
      </h2>
      <div className='app__books'>
        <div className='app__book-filter app__flex'>
          {["Nodejs", "Graphql", "Reactjs", "Flutter", "All"].map(
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
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          className='app__book-list'
        >
          {loading ? (
            <div className='app_container'>Loading...</div>
          ) : error ? (
            <div>Something went wrong!</div>
          ) : (
            renderBooks()
          )}
        </motion.div>
      </div>
    </div>
  )
}

const BookCard = ({ book }) => {
  const { title, desc, imageUrl, categories, author } = book

  return (
    <>
      <div className='app__book-item app__flex'>
        <div className='app__book-img app__flex'>
          <img src={imageUrl} alt={title} />

          <motion.div
            whileHover={{ opacity: [0, 1] }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
              staggerChildren: 0.5,
            }}
            className='app__book-hover app__flex'
          >
            <motion.div
              whileInView={{ scale: [0, 1] }}
              whileHover={{ scale: [0, 0.9] }}
              transition={{ duration: 0.25 }}
              className='app__flex'
            >
              <AiFillEye />
            </motion.div>
          </motion.div>
        </div>

        <div className='app__book-content app__flex'>
          <h1 className='bold-text'>{title}</h1>
          <p className='p-text' style={{ marginTop: 10, textAlign: "center" }}>
            {desc}
          </p>

          <div className='app__book-author app__flex'>
            <p className='p-text head-text'>
              By <span>{author}</span>
            </p>
          </div>
          <div className='app__book-category app__flex'>
            <p className='p-text'>{categories[0]}</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Books
