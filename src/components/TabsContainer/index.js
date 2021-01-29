import React, { useEffect, useState } from 'react';

import './style.scss'

const TabsContainer = (props) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        const newItems = [];
        props.items.forEach((el, index) => {
            const newItem = Object.assign({}, el)
            newItem.active = index === 0;
            newItems.push(newItem);
        })
        setItems(newItems);
    }, [props.items]);

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
                    {el.active && el.item(el.properties)}
                </div>
            ))}
        </div>
    );
};

export default TabsContainer;
