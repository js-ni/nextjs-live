import Image from 'next/image'
import Link from 'next/link'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faCodeBranch,
  faStar,
} from '@fortawesome/free-solid-svg-icons'

export default function User({repositories, username}) {
  const user = repositories[0]?.owner

  return (
    <>
      <div className="flex items-center !space-x-4">
        <Link href="/" passHref>
          <a className="bg-gray-200 hover:bg-gray-300 h-8 flex items-center justify-center rounded-full w-8">
            <FontAwesomeIcon fixedWidth icon={faArrowLeft} />
          </a>
        </Link>
        <Image
          alt={user.login}
          className="rounded-full shadow-md"
          height={40}
          src={user.avatar_url}
          width={40}
        />
        <div className="font-semibold">{username}</div>
      </div>
      <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-3 mt-4">
        {repositories.map((repo) => (
          <div
            className="bg-white flex flex-col min-h-[160px] p-4 rounded-md shadow-md"
            key={repo.id}
          >
            <div className="font-medium">{repo.name}</div>
            <div className="flex-1 text-sm">{repo.description}</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faStar} />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCodeBranch} />
                <span>{repo.forks}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const response = await fetch(
    `https://api.github.com/orgs/js-ni/public_members`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }
  )
  const users = await response.json()
  const paths = users.map((user) => ({params: {username: user.login}}))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({params: {username}}) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }
  )
  const repositories = await response.json()

  return {
    props: {
      repositories,
      username,
    },
  }
}
