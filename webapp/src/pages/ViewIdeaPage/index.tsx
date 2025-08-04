import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as { ideaNick: string }

  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({ ideaNick })
  if (isLoading || isFetching) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (!data?.idea) return <div>No ideas found</div>

  return (
    <div>
      <h1>{data.idea?.name}</h1>
      <p>{data.idea?.description}</p>
      <div dangerouslySetInnerHTML={{ __html: `${data.idea?.text}` }} />
    </div>
  )
}
