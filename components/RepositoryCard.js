import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCodeBranch, faStar} from '@fortawesome/free-solid-svg-icons'

export default function RepositoryCard({repository}) {
  return (
    <div className="bg-white flex flex-col min-h-[160px] p-4 rounded-md shadow-md">
      <div className="font-medium">{repository.name}</div>
      <div className="flex-1 text-sm">{repository.description}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faStar} />
          <span>{repository.stargazers_count}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faCodeBranch} />
          <span>{repository.forks}</span>
        </div>
      </div>
    </div>
  )
}
