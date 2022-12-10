import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg:"#0F123B",
        bgSize: "contain",
        bgPosition: "center center",
      },
    }),
  },
})