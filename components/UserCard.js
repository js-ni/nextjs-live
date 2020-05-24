import Link from 'next/link'
import {Box, Image, Stack} from '@chakra-ui/core'

export default function UserCard({user}) {
  return (
    <Link passHref as={`/${user.login}`} href="/[username]">
      <Stack as="a" align="center" bg="white" p={4} rounded="md" shadow="md">
        <Image rounded="full" size={96} src={user.avatar_url} />
        <Box fontSize="sm" fontWeight="medium">
          @{user.login}
        </Box>
      </Stack>
    </Link>
  )
}
