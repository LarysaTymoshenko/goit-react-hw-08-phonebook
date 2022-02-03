import { css } from '@emotion/react'
import { PropTypes } from 'prop-types'
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 2px;
`

const loading = true

function Loader({ size = 60 }) {
  return (
    <DotLoader
      color="rgb(215, 54, 49)"
      loading={loading}
      css={override}
      size={size}
    />
  )
}

Loader.propTypes = {
  size: PropTypes.number,
}

export default Loader