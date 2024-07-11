import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Lock = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#4F4F4F"
      d="M4.5 6v-.75a4.5 4.5 0 0 1 9 0V6H15a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75v-9A.75.75 0 0 1 3 6h1.5Zm9.75 1.5H3.75V15h10.5V7.5Zm-6 4.299a1.5 1.5 0 1 1 1.5 0V13.5h-1.5v-1.701ZM6 6h6v-.75a3 3 0 0 0-6 0V6Z"
    />
  </Svg>
)
export default Lock
