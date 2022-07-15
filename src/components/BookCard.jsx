import React from "react"
import { motion } from "framer-motion"
import { AiFillEye } from "react-icons/ai"

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

export default BookCard
