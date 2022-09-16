import Image from 'next/image'
import Link from 'next/link'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

import RepositoryCard from '@components/RepositoryCard'
import ky from '@utils/ky'

export default function User({repositories}) {
  const user = repositories[0]?.owner

  return (
    <>
      <div className="flex items-center !space-x-4">
        <Link href="/">
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
        {repositories.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const users = await ky.get('orgs/js-ni/public_members').json()
  const paths = users.map((user) => ({params: {username: user.login}}))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({params: {username}}) {
  const repositories = await ky.get(`users/${username}/repos`).json()

  return {
    props: {
      repositories,
    },
  }
}
