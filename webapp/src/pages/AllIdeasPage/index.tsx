import { Link } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import { getViewIdeaRoute } from '../../lib/routes'
import css from './index.module.scss'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()
  if (isLoading || isFetching) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (!data) return <div>No ideas found</div>
  return (
    <>
      <h1 className={css.title}>All Ideas</h1>
      <div className={css.ideas}>
        {data.ideas.map((idea) => (
          <div className={css.idea} key={idea.nick}>
            <h2 className={css.ideaName}>
              <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.nick })}>
                {idea.name}
              </Link>
            </h2>
            <p className={css.ideaDescription}>{idea.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}
