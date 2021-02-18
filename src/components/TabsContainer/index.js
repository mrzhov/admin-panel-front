import React, { useEffect, useState } from 'react';
import { getQueryString, pushHistory, runCallback } from "../../lib/functions";

import './style.scss'
import { useSelector } from "react-redux";
import { withRouter } from "react-router";

const TabsContainer = ({ tabs, history }) => {
    const sortConfig = useSelector(state => state.commonFlags.sortConfig);
    const [items, setItems] = useState([]);

    const { page } = getQueryString();

    useEffect(() => {
        const newItems = tabs.map((el, i) => {
            const newItem = { ...el };
            newItem.active = i === 0;
            return newItem;
        })
        setItems(newItems);
    }, []);

    useEffect(() => {
        items.forEach(el => {
            if (el.active)
                runCallback(el.fetchData.func, { ...el.fetchData.params, ...sortConfig, page })
        })
    }, [items, sortConfig, page])

    const setActiveTab = item => {
        pushHistory({ page: '' }, true, history);
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
                {items.map(el => (
                    <div className={`tabItem${el.active ? ' tabItem_active' : ''}`} key={el.id}>
                        <button onClick={() => setActiveTab(el)}>
                            {el.tabName}
                        </button>
                    </div>
                ))}
            </div>
            {items.map(el => (
                <div className="itemContainer" key={el.id}>
                    {el.active && el.template(el.properties)}
                </div>
            ))}
        </div>
    );
};

export default withRouter(TabsContainer);
