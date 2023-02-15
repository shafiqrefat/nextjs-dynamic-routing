import { useRouter } from "next/router";

const CommentDetails = ({ comment }) => {
  const router = useRouter()
  const handleBack = () => {
    router.push("/")
  }
  return (
    <div className="bg-teal-800 text-white text-center p-2">
      <h2>ID: {comment?.id}</h2>
      <h2 className='text-2xl font-medium'>Name: {comment?.name}</h2>
      <h2>Email: {comment?.email}</h2>
      <h2>Body: {comment?.body}</h2>
      <button onClick={handleBack} className="bg-slate-500 p-2 rounded-lg font-thin">Back to Home</button>
    </div>
  );
};
export const getStaticProps = async ({ params }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${params?.commentsId}?_limit=10`)
  const comment = await response.json()
  return {
    props: {
      comment
    }
  }
}
export const getStaticPaths = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments")
  const comments = await response.json()
  const paths = comments.map(comment => {
    return {
      params: {
        commentsId: `${comment?.id}`
      }
    }
  })
  return {
    paths,
    fallback: false
  }
}
export default CommentDetails;