import React from 'react'
import css from "../Routes/Routes.module.css";

function BoxTitle(props) {
    const { title } = props
    return (
        <React.Fragment>
            <h2 className={`${css.PageTitle}`}>{title}</h2>
        </React.Fragment>
    )
}

export default BoxTitle
