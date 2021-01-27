import React, { useState } from 'react';

import './style.scss'

const TabsContainer = (props) => {
    const [items, setItems] = useState(props.items.map((el, index) => {
        el.active = index === 0;
        return el
    }))

    const setActiveTab = (item) => {
        setItems(
            items.map(el => {
                el.active = item.id === el.id;
                return el;
            })
        )
    };
    return (
        <div className='tabsContainer'>
            <div className='tabsList'>
                {Array.from(items).map((item, i) => (
                    <div className={`tabItem${item.active ? ' tabItem_active' : ''}`} key={i}>
                        <button onClick={() => setActiveTab(item)}>
                            {item.tabName}
                        </button>
                    </div>
                ))}
            </div>
            {Array.from(items).map((el, i) => (
                <div className="itemContainer" key={i}>
                    {el.active && el.item}
                </div>
            ))}
        </div>
    );
};

export default TabsContainer;
