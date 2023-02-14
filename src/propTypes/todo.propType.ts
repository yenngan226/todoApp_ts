import PropTypes from 'prop-types'

export const todoPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
}).isRequired
