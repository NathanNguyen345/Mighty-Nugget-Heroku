import React from 'react'

function BoxTitle(props) {
    const { title } = props
    return (
        <React.Fragment>
            <h2>{title}</h2>
        </React.Fragment>
    )
}

export default BoxTitle
