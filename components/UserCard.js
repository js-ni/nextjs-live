import Image from 'next/image'
import Link from 'next/link'

export default function UserCard({user}) {
  return (
    <>
      <Link href={user.login}>
        <a className="bg-white flex flex-col items-center p-4 rounded-md shadow-md space-y-2">
          <Image
            alt={user.login}
            className="rounded-full"
            height={8 * 16}
            src={user.avatar_url}
            width={8 * 16}
          />
          <div className="font-medium text-sm">@{user.login}</div>
        </a>
      </Link>
    </>
  )
}
