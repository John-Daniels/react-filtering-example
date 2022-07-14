import { useQuery, gql } from "@apollo/client"

const GET_BOOKS = gql`
  query {
    books {
      id
      title
      imageUrl
      desc
      author
      categories
      createdAt
    }
  }
`

const useBooks = () => {
  const { data, error, loading } = useQuery(GET_BOOKS)

  return {
    data,
    error,
    loading,
  }
}

export default useBooks
