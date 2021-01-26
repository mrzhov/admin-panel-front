import React, { useEffect, useState } from 'react';

import './style.scss';
import Pagination from "../Pagination";
import { connect, useSelector } from "react-redux";
import Spinner from "../Spinner";
import { SET_SORT_CONFIG } from "../../redux/actions/commonFlags";

const Table = props => {
    const [sortConfig, setSortConfig] = useState(null);
    const isFetching = useSelector(state => state.commonFlags.isFetching);

    useEffect(() => {
        if (sortConfig) {
            props.setStoreSortConfig(sortConfig);
        }
    }, [sortConfig])

    const setSortingField = (value) => {
        let direction = 1;
        let config = {};
        config.sortField = value;

        if (sortConfig && sortConfig.sortField === value) {
            config.sortDirection = sortConfig.sortDirection === 1 ? -1 : 1
        } else {
            config.sortDirection = direction
        }
        setSortConfig(config);
    }

    return (
        <>
            <div
                className='tableContainer'
                style={props.style || {}}
            >
                <table className='table'>
                    <thead className={`${props.sort ? 'theadSort' : null}`}>
                    <tr>
                        {props.options.map((option, i) => (
                            <th
                                className={`${option.className ? `${option.className}` : ''}${sortConfig && sortConfig.sortField === option.name ? ' th_active' : ''}`}
                                style={option.name === 'actions' || option.name === 'users' ? { cursor: 'default' } : null}
                                key={i}
                                onClick={() => (option.name === 'actions' || option.name === 'users') ? null : setSortingField(option.name)}
                            >
                                {option.value}
                                {(props.sort && sortConfig && option.name === sortConfig.sortField)
                                    ? (sortConfig.sortDirection && sortConfig.sortDirection === 1) ? ' ↑' : ' ↓'
                                    : null}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    {!isFetching && (
                        <tbody>
                        {props.rows.map(item => (
                            <tr
                                key={item._id || item.id || item.gamerId}
                            >
                                {props.options.map((option, j) => (
                                    <td
                                        className={`${option.className ? ` ${option.className}` : ''}`}
                                        style={item[option.name] instanceof Array ? { 'whiteSpace': 'pre-line' } : null}
                                        key={`${item._id}-${j}`}
                                    >
                                        {item[option.name] instanceof Array
                                            ? item[option.name].map(el => el + '\n')
                                            : item[option.name]
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    )}
                </table>
            </div>
            {!isFetching && (
                <Pagination count={props.totalAmount}/>
            )}
            {isFetching && (
                <div className='spinnerContainer'>
                    <Spinner/>
                </div>
            )}
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    setStoreSortConfig: sortConfig => {
        dispatch({
            type: SET_SORT_CONFIG,
            sortConfig
        });
    }
});

export default connect(null, mapDispatchToProps)(Table);
