import {css, Global} from '@emotion/core'
import {useTheme} from '@chakra-ui/core'

export default function GlobalCSS() {
  const theme = useTheme()

  return (
    <Global
      styles={css`
        html {
          background-color: ${theme.colors.gray[100]};
        }
      `}
    />
  )
}
