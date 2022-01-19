import React from 'react';
import { useSelector } from 'react-redux';
import ItemBoxContainer from './ItemBoxContainer';

import css from "./ItemBox.module.css";

function RequiredOreContainer() {
    const mintingMats = useSelector(state => state.mintMaterialsSlice.materials)

    const renderMatsContainer = () => {
        let content = [];

        // Render out matieral found in redux store
        for (let key in mintingMats) {
            content.push(
                <React.Fragment key={key}>
                    <ItemBoxContainer
                        title={key}
                        action={mintingMats[key]}
                        selection={true} />
                </React.Fragment>
            )
        }

        return content;
    }

    return (
        <div className={`${css.MintingGrid} ${'grid'}`}>
            {renderMatsContainer()}
        </div>
    )
}

export default RequiredOreContainer
